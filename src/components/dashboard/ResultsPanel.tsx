"use client"

import * as React from "react"
import { PlatformContent, Platform } from "@/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostCard } from "./PostCard"
import { Toast } from "@/components/ui/toast"
import { Copy, Loader2 } from "lucide-react"

interface ResultsPanelProps {
  results: PlatformContent[] | null
  isLoading: boolean
  error: string | null
}

export function ResultsPanel({ results, isLoading, error }: ResultsPanelProps) {
  const [toastMsg, setToastMsg] = React.useState("")
  const [showToast, setShowToast] = React.useState(false)

  const displayToast = (msg: string) => {
    setToastMsg(msg)
    setShowToast(true)
  }

  const handleRegenerate = (id: string) => {
    // In a full app, this would call the API to regenerate a specific post
    displayToast("Функция регенерации в разработке")
  }

  const handleCopyAll = (platformContent: PlatformContent) => {
    const allText = platformContent.posts.map(p => p.content).join("\n\n---\n\n")
    navigator.clipboard.writeText(allText)
    displayToast("Все посты скопированы")
  }

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border border-gray-800 bg-gray-900/20 p-8 text-center">
        <Loader2 className="mb-4 h-8 w-8 animate-spin text-purple-500" />
        <h3 className="text-lg font-medium text-gray-200">Генерация контента...</h3>
        <p className="mt-2 text-sm text-gray-400">
          ИИ анализирует ваш текст и создает уникальные посты для каждой платформы.
          Это может занять 10-20 секунд.
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border border-red-900/30 bg-red-950/10 p-8 text-center">
        <div className="mb-4 rounded-full bg-red-900/30 p-3 text-red-400">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-red-400">Произошла ошибка</h3>
        <p className="mt-2 text-sm text-gray-400">{error}</p>
      </div>
    )
  }

  if (!results || results.length === 0) {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-800 bg-gray-900/10 p-8 text-center">
        <div className="mb-4 rounded-full bg-gray-800/50 p-4">
          <svg className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-300">Здесь появятся результаты</h3>
        <p className="mt-2 max-w-sm text-sm text-gray-500">
          Вставьте текст или ссылку слева, выберите платформы и нажмите "Сгенерировать", чтобы получить готовые посты.
        </p>
      </div>
    )
  }

  const defaultTab = results.length > 0 ? results[0].platform : ""

  const platformIcons: Record<string, React.ReactNode> = {
    [Platform.LinkedIn]: <span className="mr-2">💼</span>,
    [Platform.Twitter]: <span className="mr-2">🐦</span>,
    [Platform.Telegram]: <span className="mr-2">✈️</span>,
    [Platform.Email]: <span className="mr-2">✉️</span>,
    [Platform.Stories]: <span className="mr-2">📱</span>,
  }

  return (
    <div className="flex h-full flex-col">
      <Tabs defaultValue={defaultTab} className="flex-1">
        <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <TabsList className="inline-flex min-w-full">
            {results.map((content) => (
              <TabsTrigger key={content.platform} value={content.platform} className="whitespace-nowrap">
                {platformIcons[content.platform]}
                {content.platform.charAt(0).toUpperCase() + content.platform.slice(1)}
                <span className="ml-2 rounded bg-gray-800 px-1.5 py-0.5 text-[10px] text-gray-400">
                  {content.posts.length}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {results.map((content) => (
          <TabsContent key={content.platform} value={content.platform} className="mt-0 focus:outline-none">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-200">
                Сгенерировано для {content.platform.charAt(0).toUpperCase() + content.platform.slice(1)}
              </h3>
              <button
                onClick={() => handleCopyAll(content)}
                className="flex items-center rounded-md bg-gray-800 px-3 py-1.5 text-sm text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
              >
                <Copy className="mr-2 h-4 w-4" />
                Скопировать всё
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {content.posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onShowToast={displayToast}
                  onRegenerate={handleRegenerate}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Toast message={toastMsg} visible={showToast} onClose={() => setShowToast(false)} />
    </div>
  )
}
