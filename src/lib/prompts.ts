export const SYSTEM_PROMPT = `
You are an expert social media strategist and content repurposer.
Your goal is to take a piece of source content (article, video transcript, post) and intelligently repurpose it into native, high-performing content for various social media platforms.

Always follow these core principles:
1. Native formatting: Adapt to each platform's unique culture and format.
2. Hook-driven: Start strong to grab attention in the feed.
3. Value-focused: Extract and deliver the best insights clearly.
4. Consistent tone: Maintain the requested tone, but adapt to the platform.
5. Language: Always output in the specified language.
`;

export const EXTRACT_INSIGHTS_PROMPT = `
Extract 5-7 key insights, ideas, or takeaways from the source content.
`;

export const LINKEDIN_PROMPT = `
Generate 4 LinkedIn posts based on the source content.
Each post must follow a Hook + Story/Insight + CTA structure.
Length: 800-1400 characters.
Include 3-5 relevant hashtags at the bottom.
Format clearly with line breaks for readability (short paragraphs, 1-2 sentences).
Focus on professional growth, thought leadership, or industry insights.
`;

export const TWITTER_PROMPT = `
Generate 6 tweets based on the source content.
Each tweet must be under 280 characters.
Make them punchy, engaging, and ready for a thread (or standalone).
Include 1-2 relevant hashtags per tweet.
Avoid corporate speak; be direct and concise.
`;

export const TELEGRAM_PROMPT = `
Generate 4 Telegram channel posts based on the source content.
Length: Medium (300-800 characters).
Use emojis appropriately to structure the post and add personality (but don't overdo it).
Maintain a conversational, direct-to-audience tone.
Include formatting like bold (using markdown **text**) for key points.
End with a question or subtle call to action.
`;

export const EMAIL_PROMPT = `
Generate a 3-part email newsletter digest based on the source content.
Include:
1. An engaging intro hook.
2. 3 key takeaways formatted as distinct sections.
3. A concluding thought and call to action (CTA).
Tone should be personal, as if writing directly to a subscriber.
`;

export const STORIES_PROMPT = `
Generate 5 quote card texts for Instagram/Facebook Stories or Reels based on the source content.
Each quote must be short, punchy, and impactful (1-2 sentences maximum).
Focus on the most controversial, inspiring, or counter-intuitive points.
`;

export function getGenerationPrompt(platforms: string[], tone: string = 'Professional', language: string = 'Russian') {
  return `
    You must generate:
    1. 4-6 key insights from the source content.
    2. Social media content for the following platforms: ${platforms.join(', ')}.
    Tone to use: ${tone}.
    Output language MUST BE: ${language}.
    
    Structure your response as a valid JSON object with this exact schema:
    {
      "insights": ["Ключевая мысль 1", "Ключевая мысль 2", "Ключевая мысль 3"],
      "linkedin": ["post 1 content", "post 2 content"],
      "twitter": ["tweet 1", "tweet 2"],
      "telegram": ["post 1", "post 2"],
      "email": ["email section 1", "email section 2", "email section 3"],
      "stories": ["quote 1", "quote 2"]
    }
    
    Only include platform keys for the requested platforms: ${platforms.join(', ')}. Always include the "insights" key.
    
    Follow these specific guidelines per platform:
    LinkedIn: ${LINKEDIN_PROMPT}
    Twitter: ${TWITTER_PROMPT}
    Telegram: ${TELEGRAM_PROMPT}
    Email Newsletter: ${EMAIL_PROMPT}
    Stories/Reels: ${STORIES_PROMPT}
    
    Return ONLY valid JSON. Do not include markdown formatting like \`\`\`json.
  `;
}
