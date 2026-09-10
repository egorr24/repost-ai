# 🚀 RepostAI — AI Content Repurposer

> **Превратите один текст, статью или транскрипт видео в 25+ уникальных постов для всех социальных сетей за секунды.**

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat&logo=tailwind-css)
![Google Gemini](https://img.shields.io/badge/Google-Gemini_AI-orange?style=flat)

---

## 🌟 Возможности

- ⚡️ **Мгновенная адаптация контента** под культуру и алгоритмы каждой площадки:
  - 💼 **LinkedIn** — структурированные посты с хуком, сторителлингом и CTA
  - ✈️ **Telegram** — форматирование с эмодзи, жирным шрифтом и вовлекающими вопросами
  - 🐦 **X (Twitter)** — ёмкие твиты до 280 символов с хэштегами
  - ✉️ **Email Digest** — готовый дайджест рассылки из 3 частей
  - 📱 **Stories & Reels** — карточки с цитатами и ключевыми мыслями
- 🎯 **Умное извлечение инсайтов** (Key Takeaways) из оригинального текста
- ⚙️ **Гибкие настройки:** выбор тональности (Professional, Casual, Provocative, Educational) и языка
- 🤖 **Поддержка Google Gemini 3.6 Flash** (быстро и бесплатно) и OpenAI GPT-4o-mini
- 💳 **Готовая платёжная модель:** Free, Стандарт (990 ₽/мес) и Lifetime (3 990 ₽)

---

## 🛠️ Быстрый старт

### 1. Клонирование и установка зависимостей
```bash
git clone https://github.com/egorr24/repost-ai.git
cd repost-ai
npm install
```

### 2. Настройка переменных окружения
Создайте файл `.env.local` в корне проекта:
```env
GEMINI_API_KEY=ваш_ключ_от_Google_AI_Studio
# Или OPENAI_API_KEY=sk-...
```
> Бесплатный ключ Gemini можно получить за 10 секунд на [Google AI Studio](https://aistudio.google.com/app/apikey).

### 3. Запуск dev-сервера
```bash
npm run dev
```
Откройте [http://localhost:3000](http://localhost:3000) в браузере.

---

## 🚀 Деплой на Vercel в 1 клик

1. Перейдите на [vercel.com](https://vercel.com) и войдите через GitHub.
2. Нажмите **Add New...** → **Project** → выберите `repost-ai`.
3. В **Environment Variables** добавьте `GEMINI_API_KEY`.
4. Нажмите **Deploy**!

---

## 📄 Лицензия
MIT © 2026 RepostAI
