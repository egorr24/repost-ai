import { NextResponse } from 'next/server';
import { generateChatCompletion } from '@/lib/openai';
import { SYSTEM_PROMPT, getGenerationPrompt } from '@/lib/prompts';
import { RepurposeRequest, RepurposeResponse, PlatformContent, GeneratedPost } from '@/types';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RepurposeRequest;
    const { content, platforms, tone = 'Professional', language = 'Russian', apiKey } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: 'Пожалуйста, введите текст для обработки' }, { status: 400 });
    }

    if (!platforms || platforms.length === 0) {
      return NextResponse.json({ error: 'Выберите хотя бы одну платформу' }, { status: 400 });
    }

    // Unified single-call generation (Fast, avoids rate limits & high demand spikes)
    const generationPrompt = getGenerationPrompt(platforms, tone, language);
    
    const generatedContentRaw = await generateChatCompletion(
      [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Исходный контент:\n\n${content}\n\n${generationPrompt}` }
      ],
      undefined,
      0.7,
      'json_object',
      apiKey
    );

    let parsedContent: Record<string, any> = {};
    if (generatedContentRaw) {
      try {
        parsedContent = JSON.parse(generatedContentRaw);
      } catch (e) {
        const cleaned = generatedContentRaw.replace(/```json/g, '').replace(/```/g, '').trim();
        parsedContent = JSON.parse(cleaned);
      }
    }

    const insights: string[] = Array.isArray(parsedContent.insights) ? parsedContent.insights : [];

    // Format platform content response
    const platformsData: PlatformContent[] = [];

    platforms.forEach((platform) => {
      const posts: string[] = Array.isArray(parsedContent[platform]) ? parsedContent[platform] : [];
      const generatedPosts: GeneratedPost[] = posts.map((postContent) => ({
        id: crypto.randomUUID(),
        platform,
        content: postContent,
        characterCount: postContent.length,
      }));

      platformsData.push({
        platform,
        posts: generatedPosts,
      });
    });

    const response: RepurposeResponse = {
      insights,
      platforms: platformsData,
    };

    return NextResponse.json(response);

  } catch (error: any) {
    console.error('Repurpose API Error:', error?.message || error);
    return NextResponse.json(
      { error: error?.message || 'Ошибка обработки запроса' },
      { status: 500 }
    );
  }
}
