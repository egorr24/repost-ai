-- =======================================================
-- Схема базы данных RepostAI для Supabase SQL Editor
-- Скопируйте весь этот код и вставьте в SQL Editor в панели Supabase
-- =======================================================

-- 1. Таблица профилей пользователей
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  plan TEXT DEFAULT 'free', -- 'free', 'pro', 'lifetime'
  generations_used INTEGER DEFAULT 0,
  generations_limit INTEGER DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Таблица истории генераций контента
CREATE TABLE IF NOT EXISTS public.generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  source_content TEXT NOT NULL,
  insights JSONB,
  platforms_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Включение Row Level Security (RLS) для защиты данных
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;

-- Политики доступа для profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Политики доступа для generations
CREATE POLICY "Users can view their own generations" 
ON public.generations FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own generations" 
ON public.generations FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own generations" 
ON public.generations FOR DELETE 
USING (auth.uid() = user_id);

-- 4. Автоматическое создание профиля при регистрации через Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, plan, generations_used, generations_limit)
  VALUES (
    NEW.id,
    NEW.email,
    'free',
    0,
    3
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Триггер срабатывает после каждого создания пользователя в auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
