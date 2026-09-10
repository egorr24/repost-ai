"use client"

import * as React from "react"
import { X, Mail, Lock, Sparkles, Loader2 } from "lucide-react"
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = React.useState<"signin" | "signup">("signin")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [message, setMessage] = React.useState<string | null>(null)

  if (!isOpen) return null

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setMessage(null)

    if (!isSupabaseConfigured) {
      setIsLoading(false)
      setError("Supabase ещё не настроен. Добавьте ключи в .env.local")
      return
    }

    try {
      if (mode === "signin") {
        const { error: signInErr } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (signInErr) throw signInErr
        onSuccess?.()
        onClose()
      } else {
        const { error: signUpErr, data } = await supabase.auth.signUp({
          email,
          password,
        })
        if (signUpErr) throw signUpErr
        if (data.session) {
          onSuccess?.()
          onClose()
        } else {
          setMessage("Проверьте вашу почту для подтверждения регистрации!")
        }
      }
    } catch (err: any) {
      setError(err?.message || "Ошибка авторизации")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    setError(null)

    if (!isSupabaseConfigured) {
      setIsLoading(false)
      setError("Supabase ещё не настроен. Добавьте ключи в .env.local")
      return
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: typeof window !== "undefined" ? `${window.location.origin}/dashboard` : undefined,
        },
      })
      if (error) throw error
    } catch (err: any) {
      setError(err?.message || "Ошибка входа через Google")
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-neutral-900 p-6 sm:p-8 text-white shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-medium text-violet-300 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Личный кабинет RepostAI</span>
        </div>

        <h3 className="text-2xl font-bold mb-1">
          {mode === "signin" ? "Вход в аккаунт" : "Создать аккаунт"}
        </h3>
        <p className="text-neutral-400 text-sm mb-6">
          {mode === "signin" 
            ? "Войдите, чтобы сохранять историю и управлять тарифом" 
            : "Получите 3 бесплатные генерации контента сразу после регистрации"}
        </p>

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-400">
            {message}
          </div>
        )}

        {/* Google 1-Click Button */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/20 disabled:opacity-50 mb-4"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
            />
            <path
              fill="#FBBC05"
              d="M5.3 14.7c-.2-.7-.4-1.4-.4-2.2 0-.8.1-1.5.4-2.2L1.6 7.4C.6 9.4 0 11.6 0 14s.6 4.6 1.6 6.6l3.7-2.9c-.4-.9-.6-1.9-.6-3z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16c1.9 3.8 5.8 7 10.4 7z"
            />
          </svg>
          <span>Продолжить через Google</span>
        </button>

        <div className="relative my-4 flex items-center justify-center">
          <div className="w-full border-t border-white/10" />
          <span className="absolute bg-neutral-900 px-3 text-[11px] uppercase tracking-wider text-neutral-500">
            или через Email
          </span>
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-500" />
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-neutral-950 pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1">Пароль</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-500" />
              <input
                type="password"
                required
                minLength={6}
                placeholder="Минимум 6 символов"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-neutral-950 pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full mt-2" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Загрузка...</span>
              </span>
            ) : mode === "signin" ? (
              "Войти"
            ) : (
              "Зарегистрироваться"
            )}
          </Button>
        </form>

        <div className="mt-5 text-center text-xs text-neutral-400">
          {mode === "signin" ? (
            <span>
              Нет аккаунта?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="text-violet-400 hover:underline font-medium"
              >
                Создать бесплатно
              </button>
            </span>
          ) : (
            <span>
              Уже есть аккаунт?{" "}
              <button
                type="button"
                onClick={() => setMode("signin")}
                className="text-violet-400 hover:underline font-medium"
              >
                Войти
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
