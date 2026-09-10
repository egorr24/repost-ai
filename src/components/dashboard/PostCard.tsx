"use client"

import * as React from "react"
import { GeneratedPost, Platform } from "@/types"
import { Copy, RefreshCw } from "lucide-react"

interface PostCardProps {
  post: GeneratedPost
  onShowToast: (msg: string) => void
  onRegenerate: (id: string) => void
}

export function PostCard({ post, onShowToast, onRegenerate }: PostCardProps) {
  const [isCopying, setIsCopying] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(post.content)
      setIsCopying(true)
      onShowToast("Скопировано в буфер обмена")
      setTimeout(() => setIsCopying(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
      onShowToast("Ошибка при копировании")
    }
  }

  const platformLabels: Record<Platform, string> = {
    [Platform.LinkedIn]: "LinkedIn",
    [Platform.Twitter]: "X / Twitter",
    [Platform.Telegram]: "Telegram",
    [Platform.Email]: "Email",
    [Platform.Stories]: "Stories",
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/40 p-5 transition-all hover:border-gray-700 hover:bg-gray-900/60 hover:shadow-md hover:shadow-purple-900/10">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
            {platformLabels[post.platform]}
          </span>
          <span className="rounded-full bg-gray-800 px-2 py-0.5 text-[10px] text-gray-400">
            {post.content.length} симв.
          </span>
        </div>
        <div className="flex space-x-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onRegenerate(post.id)}
            className="rounded p-1.5 text-gray-400 hover:bg-gray-800 hover:text-white"
            title="Регенерировать"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={handleCopy}
            className="rounded p-1.5 text-gray-400 hover:bg-gray-800 hover:text-white"
            title="Копировать"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
        {post.content}
      </div>
    </div>
  )
}
