"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Play, Star, CheckCircle2, Copy, Twitter, Linkedin, Send, Mail, Instagram, Sparkles, LayoutDashboard, Layers, Zap, Tags, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/landing/Header"
import { PricingCard } from "@/components/landing/PricingCard"
import { FAQItem } from "@/components/landing/FAQItem"
import { PaymentModal } from "@/components/landing/PaymentModal"

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("linkedin")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState({ name: "Lifetime", price: "3 990 ₽" })

  const previewContent: Record<string, string> = {
    linkedin: "Вчера я провел 10 часов за созданием контента.\nСегодня — 30 секунд. 🚀\n\nAI полностью меняет правила игры для креаторов. Вот 3 способа, как автоматизация спасла мой график:\n\n1️⃣ Репёрпозинг статей в посты\n2️⃣ Выделение главных инсайтов из подкастов\n3️⃣ Генерация каруселей по одному клику\n\nА сколько времени вы тратите на контент? 👇\n\n#AI #Productivity #ContentCreation #CreatorEconomy",
    twitter: "Контент — это король, но дистрибуция — это бог 👑\n\nПерестал тратить часы на адаптацию постов. 1 статья = 25 постов для всех платформ за 30 секунд. \n\nБудущее уже здесь ⚡️\n\n#AI #SaaS #Growth",
    telegram: "🔥 Как я сократил время на контент с 10 часов до 30 секунд в неделю?\n\nСпойлер: всё дело в правильном репёрпозинге.\n\nМы часто пишем лонгриды, а потом забываем про них. Но каждый лонгрид — это кладезь идей для коротких постов. Я начал использовать AI для извлечения смыслов, и результаты поражают.\n\n👇 Читайте подробный разбор метода в статье (ссылка в комментариях).",
    email: "Тема: Как создавать контент в 10 раз быстрее ⚡️\n\nПривет!\n\nЗнаете это чувство, когда статья готова, но впереди еще часы адаптации для соцсетей? Я нашел решение.\n\nНа этой неделе я протестировал новый подход к дистрибуции контента. Результат: 25 готовых постов из одной статьи, и все это за 30 секунд.\n\nВ этом письме я расскажу...",
    stories: "📱 [Слайд 1] Как перестать тратить часы на контент?\n\n[Слайд 2] 💡 Секрет: Умный репёрпозинг.\n\n[Слайд 3] 1 статья → 25 постов. \n\n[Слайд 4] Хочешь так же? Ссылка в био! 🔗"
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-violet-500/30">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[128px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-violet-300 mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>Новое: Поддержка YouTube транскриптов</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50 max-w-4xl mx-auto leading-tight"
          >
            Один контент — неделя постов для всех соцсетей
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
          >
            Загрузи статью или подкаст → получи 25+ готовых постов для LinkedIn, Twitter, Telegram, email и Stories за 30 секунд.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8" asChild>
              <Link href="/dashboard">
                Попробовать бесплатно
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8">
              <Play className="mr-2 w-5 h-5 text-violet-400" />
              Смотреть демо
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex flex-col items-center gap-4"
          >
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-neutral-950 bg-neutral-800 -ml-3 first:ml-0 overflow-hidden relative">
                   <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User avatar" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="ml-4 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-sm font-medium text-neutral-300">
              <span className="text-white font-bold">500+</span> креаторов уже экономят 10 часов в неделю
            </p>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-neutral-900/50 border-y border-white/5 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Как это работает?</h2>
            <p className="text-lg text-neutral-400">Всего 3 простых шага от одной идеи до контент-плана на целую неделю.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <LayoutDashboard className="w-8 h-8 text-violet-400" />,
                title: "📝 Загрузи контент",
                desc: "Вставь текст статьи, ссылку на YouTube видео или транскрипт подкаста."
              },
              {
                icon: <Zap className="w-8 h-8 text-amber-400" />,
                title: "🤖 AI обрабатывает",
                desc: "Наш AI анализирует ключевые идеи и адаптирует их под каждую платформу с учетом алгоритмов."
              },
              {
                icon: <Layers className="w-8 h-8 text-fuchsia-400" />,
                title: "🚀 Копируй и публикуй",
                desc: "Получи 25+ готовых постов. Скачивай, копируй или планируй публикацию в один клик."
              }
            ].map((step, i) => (
              <Card key={i} className="bg-neutral-950/50 border-white/5">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Output Preview Section */}
      <section className="py-24 relative" id="preview">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white">Магия адаптации <br/>под платформу</h2>
              <p className="text-lg text-neutral-400 max-w-xl">
                Каждая соцсеть требует своего подхода. Мы не просто копируем текст — мы переписываем его в нативном формате для каждой платформы.
              </p>
              
              <div className="flex flex-col space-y-3 mt-8">
                {[
                  { id: "linkedin", icon: <Linkedin className="w-5 h-5"/>, name: "LinkedIn" },
                  { id: "twitter", icon: <Twitter className="w-5 h-5"/>, name: "Twitter / X" },
                  { id: "telegram", icon: <Send className="w-5 h-5"/>, name: "Telegram" },
                  { id: "email", icon: <Mail className="w-5 h-5"/>, name: "Email Newsletter" },
                  { id: "stories", icon: <Instagram className="w-5 h-5"/>, name: "Instagram Stories" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-200 text-left ${
                      activeTab === tab.id 
                        ? "bg-violet-600 text-white shadow-lg shadow-violet-900/20" 
                        : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium text-lg">{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 w-full relative">
               {/* Decorative elements behind preview */}
               <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl blur-xl opacity-20"></div>
               
               <Card className="relative bg-[#0A0A0A] border-white/10 overflow-hidden h-[500px] flex flex-col">
                  <div className="border-b border-white/10 p-4 flex items-center justify-between bg-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="text-xs text-neutral-500 font-mono">Generated Output</span>
                  </div>
                  
                  <div className="p-8 overflow-y-auto flex-1 font-sans">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-neutral-300 whitespace-pre-wrap leading-relaxed text-lg"
                      >
                        {previewContent[activeTab]}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end">
                    <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white">
                      <Copy className="w-4 h-4 mr-2" />
                      Копировать
                    </Button>
                  </div>
               </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-neutral-900/50 border-y border-white/5" id="features">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Всё, что нужно для роста</h2>
            <p className="text-lg text-neutral-400">Создано для креаторов, маркетологов и фаундеров, которые ценят свое время.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Адаптация под платформу",
                desc: "Алгоритмы соцсетей разные. Мы генерируем треды для X, карусели для LinkedIn и лонгриды для Telegram.",
                icon: <LayoutDashboard className="w-6 h-6 text-violet-400" />
              },
              {
                title: "Сохрани свой голос",
                desc: "Загрузи примеры своих текстов, и AI научится писать точно в твоем уникальном авторском стиле.",
                icon: <Sparkles className="w-6 h-6 text-amber-400" />
              },
              {
                title: "25+ постов за 30 сек",
                desc: "Загрузи один источник и получи контент-план на неделю. Экономь более 10 часов рутинной работы.",
                icon: <Zap className="w-6 h-6 text-fuchsia-400" />
              },
              {
                title: "LinkedIn карусели",
                desc: "Автоматически разбиваем текст на слайды, создаем заголовки и крючки для максимального охвата.",
                icon: <Layers className="w-6 h-6 text-blue-400" />
              },
              {
                title: "Хэштеги и CTA",
                desc: "Умный подбор релевантных тегов и генерация призывов к действию для вовлечения аудитории.",
                icon: <Tags className="w-6 h-6 text-green-400" />
              },
              {
                title: "Экспорт и планирование",
                desc: "Скачивай в PDF, копируй в буфер или отправляй напрямую в планировщики контента по API.",
                icon: <Download className="w-6 h-6 text-orange-400" />
              }
            ].map((feature, i) => (
              <Card key={i} className="bg-neutral-950/50 border-white/5 hover:border-violet-500/30 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24" id="pricing">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Простые тарифы</h2>
            <p className="text-lg text-neutral-400">Начни бесплатно, инвестируй в рост, когда будешь готов.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PricingCard
              name="Free"
              price="0 ₽"
              description="Для тестирования и начинающих авторов."
              features={[
                "3 бесплатные генерации",
                "Все соцсети (Telegram, X, LinkedIn)",
                "Форматирование с эмодзи",
                "Копирование постов в 1 клик"
              ]}
              buttonText="Попробовать бесплатно"
              onSelect={() => window.location.href = '/dashboard'}
            />
            <PricingCard
              name="Стандарт"
              price="990 ₽"
              period="/мес"
              description="Для регулярного ведения каналов и блогов."
              features={[
                "Безлимитные генерации постов",
                "Все платформы + Stories и Reels",
                "Выбор тональности и языка",
                "Генерация ключевых инсайтов",
                "Приоритетная скорость работы"
              ]}
              buttonText="Оформить за 990 ₽"
              buttonVariant="default"
              onSelect={() => {
                setSelectedPlan({ name: "Стандарт (1 месяц)", price: "990 ₽" })
                setIsModalOpen(true)
              }}
            />
            <PricingCard
              name="Lifetime"
              price="3 990 ₽"
              period="разово"
              description="Один платёж — вечный доступ без подписок."
              features={[
                "Всё из тарифа Стандарт навсегда",
                "Никаких ежемесячных списаний",
                "Доступ ко всем будущим обновлениям",
                "Приоритетный доступ к новым моделям AI",
                "Личная поддержка от создателя"
              ]}
              isPopular={true}
              buttonText="Купить навсегда за 3 990 ₽"
              buttonVariant="secondary"
              onSelect={() => {
                setSelectedPlan({ name: "Lifetime (Вечный доступ)", price: "3 990 ₽" })
                setIsModalOpen(true)
              }}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-neutral-900/50 border-y border-white/5" id="faq">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white">Частые вопросы</h2>
          </div>

          <div className="space-y-2">
            <FAQItem
              question="Какие форматы поддерживаются на входе?"
              answer="Вы можете загрузить текст, вставить ссылку на статью (Medium, блоги), загрузить текстовый транскрипт подкаста или указать ссылку на YouTube видео (мы автоматически скачаем субтитры)."
            />
            <FAQItem
              question="Сколько постов я получу из одной статьи?"
              answer="В среднем из одной статьи на 1000 слов система генерирует: 3-4 поста для LinkedIn, 5-7 твитов/тредов, 2-3 поста для Telegram, 1 черновик рассылки и 5 идей для коротких видео (Reels/TikTok/Stories)."
            />
            <FAQItem
              question="Можно ли настроить стиль письма?"
              answer="Да! На тарифах Pro и Lifetime вы можете добавить примеры своих лучших постов. AI проанализирует вашу тональность, длину предложений, использование эмодзи и будет писать так, словно это вы."
            />
            <FAQItem
              question="Есть ли API для интеграций?"
              answer="В данный момент API находится в стадии закрытого бета-тестирования. Публичный релиз запланирован на следующий квартал (бесплатно для Lifetime пользователей)."
            />
            <FAQItem
              question="Какие языки поддерживаются?"
              answer="Мы поддерживаем более 30 языков, включая русский, английский, испанский, немецкий и французский. Вы даже можете загрузить статью на английском и попросить сгенерировать посты на русском."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-violet-900/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/30 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Перестань тратить часы на контент</h2>
          <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
            Присоединяйся к сотням креаторов, которые уже автоматизировали дистрибуцию и кратно увеличили охваты.
          </p>
          <Button size="lg" className="h-16 px-10 text-lg rounded-xl shadow-2xl shadow-violet-500/30" asChild>
            <Link href="/dashboard">
              Начать бесплатно прямо сейчас
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
          </Button>
          <p className="mt-6 text-neutral-400 font-medium">
            <CheckCircle2 className="inline-block w-4 h-4 mr-2 text-green-400" />
            7 дней бесплатно. Отмена в один клик. Без кредитной карты.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-neutral-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-violet-400" />
              <span className="text-xl font-bold text-white tracking-tight">RepostAI</span>
            </div>
            
            <div className="flex gap-6">
              <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
            <p>© 2026 RepostAI. Все права защищены.</p>
            <a href="mailto:contact@repostai.com" className="hover:text-white transition-colors">
              contact@repostai.com
            </a>
          </div>
        </div>
      </footer>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        planName={selectedPlan.name}
        planPrice={selectedPlan.price}
      />
    </div>
  )
}
