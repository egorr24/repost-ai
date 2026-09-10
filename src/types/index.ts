export enum Platform {
  LinkedIn = 'linkedin',
  Twitter = 'twitter',
  Telegram = 'telegram',
  Email = 'email',
  Stories = 'stories',
}

export interface GeneratedPost {
  id: string;
  platform: Platform;
  content: string;
  characterCount: number;
  hashtags?: string[];
}

export interface PlatformContent {
  platform: Platform;
  posts: GeneratedPost[];
}

export interface RepurposeRequest {
  content: string;
  platforms: Platform[];
  tone?: string;
  language?: string;
  apiKey?: string;
}

export interface RepurposeResponse {
  insights: string[];
  platforms: PlatformContent[];
  error?: string;
}

export interface UserPlan {
  id: string;
  name: string;
  generationsLeft: number;
}
