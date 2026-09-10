"use client"

import * as React from "react"
import { Platform } from "@/types"
import { Textarea } from "@/components/ui/textarea"
import { Link2, FileText, Settings2, KeyRound } from "lucide-react"

interface ContentInputProps {
  onSubmit: (data: {
    content: string;
    platforms: Platform[];
    tone: string;
    language: string;
    apiKey?: string;
  }) => void;
  isLoading: boolean;
}

export function ContentInput({ onSubmit, isLoading }: ContentInputProps) {
  const [inputType, setInputType] = React.useState<"text" | "link">("text")
  const [content, setContent] = React.useState("")
  const [url, setUrl] = React.useState("")
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<Platform[]>(Object.values(Platform))
  const [tone, setTone] = React.useState("Professional")
  const [language, setLanguage] = React.useState("Russian")
  const [apiKey, setApiKey] = React.useState("")

  React.useEffect(() => {
    const savedKey = localStorage.getItem("repostai_api_key")
    if (savedKey) {
      setApiKey(savedKey)
    }
  }, [])

  const handleApiKeyChange = (val: string) => {
    setApiKey(val)
    localStorage.setItem("repostai_api_key", val)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedPlatforms.length === 0) return
    
    const finalContent = inputType === "text" ? content : `Please extract content from this URL: ${url}`
    
    if (!finalContent.trim()) return

    onSubmit({
      content: finalContent,
      platforms: selectedPlatforms,
      tone,
      language,
      apiKey: apiKey.trim() || undefined,
    })
  }

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    )
  }

  const platformsList = [
    { id: Platform.LinkedIn, label: "LinkedIn", icon: "💼" },
    { id: Platform.Twitter, label: "X / Twitter", icon: "🐦" },
    { id: Platform.Telegram, label: "Telegram", icon: "✈️" },
    { id: Platform.Email, label: "Email Digest", icon: "✉️" },
    { id: Platform.Stories, label: "Stories/Reels", icon: "📱" },
  ]

  const tones = ["Professional", "Casual", "Provocative", "Educational"]
  const languages = ["Russian", "English"]

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col space-y-6">
      <div className="space-y-4">
        <div className="flex space-x-1 rounded-lg bg-gray-900/50 p-1">
          <button
            type="button"
            onClick={() => setInputType("text")}
            className={`flex-1 flex items-center justify-center space-x-2 rounded-md py-2 text-sm font-medium transition-all ${inputType === 'text' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <FileText className="h-4 w-4" />
            <span>Текст</span>
          </button>
          <button
            type="button"
            onClick={() => setInputType("link")}
            className={`flex-1 flex items-center justify-center space-x-2 rounded-md py-2 text-sm font-medium transition-all ${inputType === 'link' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <Link2 className="h-4 w-4" />
            <span>Ссылка</span>
          </button>
        </div>

        {inputType === "text" ? (
          <div className="relative">
            <Textarea
              placeholder="Вставьте ваш оригинальный текст здесь (статья, транскрипт, заметки)..."
              className="min-h-[200px] resize-none pb-8"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-500">
              {content.length} симв.
            </div>
          </div>
        ) : (
          <input
            type="url"
            placeholder="https://example.com/article"
            className="w-full rounded-md border border-gray-800 bg-gray-950 px-4 py-3 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-300">Платформы для репоста</h3>
        <div className="flex flex-wrap gap-2">
          {platformsList.map((platform) => (
            <button
              key={platform.id}
              type="button"
              onClick={() => togglePlatform(platform.id)}
              className={`flex items-center space-x-2 rounded-full border px-3 py-1.5 text-sm transition-all ${selectedPlatforms.includes(platform.id) ? 'border-purple-500/50 bg-purple-500/10 text-purple-300' : 'border-gray-800 bg-gray-900/50 text-gray-400 hover:border-gray-700'}`}
            >
              <span>{platform.icon}</span>
              <span>{platform.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="flex items-center space-x-2 text-sm font-medium text-gray-300">
          <Settings2 className="h-4 w-4" />
          <span>Настройки</span>
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500">Тон (Tone)</label>
            <select 
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full rounded-md border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              {tones.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500">Язык (Language)</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-md border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              {languages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* API Key Input */}
        <div className="pt-2">
          <label className="flex items-center space-x-1.5 text-xs text-gray-400 mb-1.5">
            <KeyRound className="h-3.5 w-3.5 text-purple-400" />
            <span>Gemini API Key (или OpenAI)</span>
          </label>
          <input
            type="password"
            placeholder="AIzaSy... (или оставьте пустым, если в .env.local)"
            value={apiKey}
            onChange={(e) => handleApiKeyChange(e.target.value)}
            className="w-full rounded-md border border-gray-800 bg-gray-950 px-3 py-2 text-xs text-gray-300 placeholder-gray-600 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <p className="mt-1 text-[11px] text-gray-500">
            Бесплатный ключ Gemini:{" "}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-purple-400 hover:underline"
            >
              Google AI Studio
            </a>
          </p>
        </div>
      </div>

      <div className="mt-auto pt-4">
        <button
          type="submit"
          disabled={isLoading || (inputType === "text" ? !content.trim() : !url.trim()) || selectedPlatforms.length === 0}
          className="flex w-full items-center justify-center space-x-2 rounded-lg bg-purple-600 px-6 py-3.5 font-medium text-white transition-all hover:bg-purple-500 disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-500"
        >
          {isLoading ? (
            <span className="flex items-center space-x-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              <span>Генерация...</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2">
              <span>Сгенерировать 🚀</span>
            </span>
          )}
        </button>
      </div>
    </form>
  )
}
