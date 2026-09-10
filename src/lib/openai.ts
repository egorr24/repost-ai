import OpenAI from 'openai';

let cachedModelInfo: { key: string; modelName: string; apiVersion: string } | null = null;

// Dynamically discover which Gemini models are available for this user's API key
async function getSupportedModels(apiKey: string): Promise<string[]> {
  for (const apiVersion of ['v1beta', 'v1']) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/${apiVersion}/models?key=${apiKey}`
      );
      if (res.ok) {
        const data = await res.json();
        const models: Array<{ name: string; supportedGenerationMethods?: string[] }> = data?.models || [];

        const generateModels = models
          .filter(m => m.supportedGenerationMethods?.includes('generateContent'))
          .map(m => m.name.replace(/^models\//, ''));

        if (generateModels.length > 0) {
          const priority = [
            'gemini-3.6-flash',
            'gemini-3.7-flash',
            'gemini-3.8-flash',
            'gemini-3.5-flash',
            'gemini-flash-latest',
            'gemini-3.1-flash-lite',
            'gemini-2.5-pro',
            'gemini-pro-latest',
          ];

          const sorted = [
            ...priority.filter(p => generateModels.includes(p)),
            ...generateModels.filter(m => !priority.includes(m) && m.includes('flash')),
            ...generateModels.filter(m => !priority.includes(m) && !m.includes('flash')),
          ];

          return sorted;
        }
      }
    } catch (err) {
      console.warn(`ListModels check failed on ${apiVersion}:`, err);
    }
  }

  return ['gemini-3.6-flash', 'gemini-3.7-flash', 'gemini-3.8-flash', 'gemini-3.5-flash'];
}

// Direct native Google Gemini API call with auto-discovery and high-demand fallback
async function callGemini(
  apiKey: string,
  messages: Array<{ role: string; content: string }>,
  temperature: number = 0.7,
  jsonMode: boolean = false
): Promise<string> {
  const systemMsg = messages.find(m => m.role === 'system')?.content;
  const nonSystemMsgs = messages.filter(m => m.role !== 'system');

  const availableModels = await getSupportedModels(apiKey);

  const fallbackList = [
    'gemini-3.6-flash',
    'gemini-3.7-flash',
    'gemini-3.8-flash',
    'gemini-3.5-flash',
    'gemini-flash-latest',
    'gemini-3.1-flash-lite',
    'gemini-2.5-pro',
  ];

  const candidateModels = Array.from(new Set([...availableModels, ...fallbackList]));
  let lastError: any = null;

  for (let i = 0; i < candidateModels.length; i++) {
    const model = candidateModels[i];

    const contents = nonSystemMsgs.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: typeof m.content === 'string' ? m.content : JSON.stringify(m.content) }],
    }));

    const payload: any = {
      contents,
      generationConfig: {
        temperature,
        ...(jsonMode ? { responseMimeType: 'application/json' } : {}),
      },
    };

    if (systemMsg) {
      payload.systemInstruction = {
        parts: [{ text: systemMsg }],
      };
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          console.log(`Successful generation with ${model}`);
          return text;
        }
      }

      const errorMsg = data?.error?.message || `Ошибка Google Gemini API (${res.status})`;

      if (res.status === 400 && errorMsg.includes('API_KEY_INVALID')) {
        throw new Error('Неверный ключ Gemini API. Проверьте правильность ключа из Google AI Studio.');
      }

      console.warn(`Модель ${model} вернула (${res.status}): ${errorMsg}`);
      lastError = new Error(errorMsg);

      // If model is experiencing high demand, not found, or retired, try next model candidate
      const isRecoverable = 
        res.status === 404 || 
        res.status === 503 ||
        res.status === 429 ||
        errorMsg.includes('high demand') ||
        errorMsg.includes('overloaded') ||
        errorMsg.includes('not found') || 
        errorMsg.includes('not supported') ||
        errorMsg.includes('no longer available');

      if (isRecoverable) {
        console.log(`Переключаемся на резервную модель после ${model}...`);
        // Small delay to prevent rapid-fire requests
        await new Promise(r => setTimeout(r, 800));
        continue;
      }

      throw new Error(errorMsg);
    } catch (err: any) {
      if (
        err?.message?.includes('high demand') ||
        err?.message?.includes('overloaded') ||
        err?.message?.includes('not found') || 
        err?.message?.includes('not supported') ||
        err?.message?.includes('no longer available')
      ) {
        lastError = err;
        await new Promise(r => setTimeout(r, 800));
        continue;
      }
      throw err;
    }
  }

  throw lastError || new Error('Все доступные модели Gemini перегружены. Попробуйте через минуту.');
}

// Helper to determine key and provider
function resolveKeyAndProvider(customKey?: string) {
  const key = customKey?.trim() || 
              process.env.GEMINI_API_KEY?.trim() || 
              process.env.GOOGLE_API_KEY?.trim() || 
              process.env.OPENAI_API_KEY?.trim();

  if (!key) {
    return { key: '', provider: 'none' as const };
  }

  if (key.startsWith('AIza') || Boolean(process.env.GEMINI_API_KEY) || !key.startsWith('sk-')) {
    return { key, provider: 'gemini' as const };
  }

  return { key, provider: 'openai' as const };
}

// Universal completion function
export async function generateChatCompletion(
  messages: Array<{ role: string; content: string }>,
  requestedModel?: string,
  temperature: number = 0.7,
  responseFormat?: 'json_object' | 'text',
  customKey?: string
): Promise<string> {
  const { key, provider } = resolveKeyAndProvider(customKey);

  if (!key) {
    throw new Error(
      'API-ключ не указан! Введите ваш ключ Gemini в поле настроек на странице или добавьте GEMINI_API_KEY в файл .env.local (получить бесплатно: https://aistudio.google.com/app/apikey)'
    );
  }

  if (provider === 'gemini') {
    return await callGemini(key, messages, temperature, responseFormat === 'json_object');
  }

  try {
    const client = new OpenAI({
      apiKey: key,
      baseURL: process.env.OPENAI_BASE_URL || undefined,
    });

    const response = await client.chat.completions.create({
      model: requestedModel || 'gpt-4o-mini',
      messages: messages as any,
      temperature,
      ...(responseFormat === 'json_object' ? { response_format: { type: 'json_object' } } : {}),
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('Модель вернула пустой ответ');
    return content;
  } catch (err: any) {
    if (err?.status === 403) {
      throw new Error('OpenAI заблокирован в вашем регионе (403). Используйте бесплатный ключ Google Gemini!');
    }
    throw new Error(err?.message || 'Ошибка OpenAI API');
  }
}

// Simple token counting utility
export function estimateTokens(text: string): number {
  return Math.ceil(text.split(/\s+/).length * 1.3);
}
