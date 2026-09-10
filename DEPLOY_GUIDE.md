# 🚀 Инструкция по деплою RepostAI в интернет

Проект **RepostAI** полностью собран и готов к работе.

---

## Вариант 1: Быстрый запуск прямо сейчас (Уже работает!)

Прямо сейчас проект запущен на вашем компьютере с туннелем:
- **Локальный адрес:** [http://localhost:3000](http://localhost:3000)
- **Дашборд:** [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- **Публичный адрес в интернете:**
  👉 **`https://7a1752d2fa8e8f.lhr.life`**
  *(Дашборд онлайн: `https://7a1752d2fa8e8f.lhr.life/dashboard`)*

Чтобы запустить проект в любой момент одним кликом, просто дважды нажмите на файл:
📁 **`D:\projects\content-repurposer\start.bat`**

---

## Вариант 2: Бесплатный вечный хостинг на Vercel (24/7 без включенного ПК)

Vercel — это официальный хостинг Next.js, бесплатный, с автоматическим HTTPS и быстрым CDN по всему миру.

### Шаг 1: Создайте репозиторий на GitHub
1. Перейдите на [github.com/new](https://github.com/new)
2. Назовите репозиторий `repost-ai` и нажмите **Create repository**

### Шаг 2: Отправьте код в GitHub
В терминале выполните:
```bash
cd D:\projects\content-repurposer
git remote add origin https://github.com/ВАШ_НИК/repost-ai.git
git branch -M main
git push -u origin main
```

### Шаг 3: Подключите Vercel в 1 клик
1. Зайдите на [vercel.com](https://vercel.com) и войдите через GitHub.
2. Нажмите **Add New...** → **Project**.
3. Выберите ваш репозиторий `repost-ai` и нажмите **Import**.
4. В разделе **Environment Variables** добавьте:
   - `GEMINI_API_KEY` = `ваш_ключ_от_Google_AI_Studio`
5. Нажмите **Deploy**!

Через 60 секунд ваш сайт будет доступен по постоянному адресу вида `https://repost-ai.vercel.app`!
Туда же в настройках Vercel можно в 1 клик привязать собственный домен (например, `repostai.com` или `repostai.ru`).
