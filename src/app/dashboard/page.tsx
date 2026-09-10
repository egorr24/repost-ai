"use client"

import * as React from "react"
import Link from "next/link"
import { ContentInput } from "@/components/dashboard/ContentInput"
import { ResultsPanel } from "@/components/dashboard/ResultsPanel"
import { UserMenu } from "@/components/auth/UserMenu"
import { RepurposeRequest, PlatformContent } from "@/types"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [results, setResults] = React.useState<PlatformContent[] | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [insights, setInsights] = React.useState<string[]>([])

  const handleGenerate = async (data: RepurposeRequest) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/repurpose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const responseData = await response.json()
      
      if (!response.ok) {
        throw new Error(responseData.error || 'Произошла ошибка при генерации')
      }
      
      setResults(responseData.platforms)
      if (responseData.insights) {
        setInsights(responseData.insights)
      }
    } catch (err: any) {
      console.error('Generation error:', err)
      setError(err.message || 'Неизвестная ошибка')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 selection:bg-purple-500/30">
      <header className="sticky top-0 z-10 border-b border-gray-800/60 bg-[#0a0a0a]/80 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 font-bold text-white shadow-lg shadow-purple-600/20">
              R
            </div>
            <span className="text-lg font-bold tracking-tight text-white">RepostAI</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/#pricing" className="text-xs text-purple-400 hover:text-purple-300 font-medium">
              Тарифы
            </Link>
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Превратите один текст <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">в десятки постов</span>
          </h1>
          <p className="mt-2 text-gray-400">
            Вставьте ваш контент, и наш ИИ адаптирует его под форматы любых социальных сетей за секунды.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column - Input Panel */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 rounded-2xl border border-gray-800 bg-[#111111] p-5 shadow-xl">
              <ContentInput onSubmit={handleGenerate} isLoading={isLoading} />
            </div>
          </div>

          {/* Right Column - Results Area */}
          <div className="lg:col-span-8 xl:col-span-9">
            {insights.length > 0 && !isLoading && !error && (
              <div className="mb-6 rounded-xl border border-purple-900/30 bg-purple-900/10 p-5">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple-400">
                  Ключевые инсайты текста
                </h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {insights.map((insight, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-300">
                      <span className="mr-2 mt-0.5 text-purple-500">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="h-[calc(100vh-250px)] min-h-[600px] rounded-2xl border border-gray-800 bg-[#111111] p-5 shadow-xl">
              <ResultsPanel results={results} isLoading={isLoading} error={error} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
