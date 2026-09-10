"use client"

import * as React from "react"
import { useUser } from "@/lib/supabase/useUser"
import { AuthModal } from "./AuthModal"
import { User, LogOut, Sparkles, ChevronDown } from "lucide-react"

export function UserMenu() {
  const { user, profile, loading, signOut } = useUser()
  const [isAuthOpen, setIsAuthOpen] = React.useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

  if (loading) {
    return (
      <div className="h-8 w-20 animate-pulse rounded-lg bg-neutral-800" />
    )
  }

  if (!user) {
    return (
      <>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAuthOpen(true)}
            className="rounded-lg px-3.5 py-1.5 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
          >
            Войти
          </button>
          <button
            onClick={() => setIsAuthOpen(true)}
            className="rounded-lg bg-violet-600 px-3.5 py-1.5 text-xs font-medium text-white shadow-md shadow-violet-600/20 hover:bg-violet-500 transition-colors"
          >
            Регистрация
          </button>
        </div>
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </>
    )
  }

  const planLabels = {
    free: "Free",
    pro: "Стандарт (Pro)",
    lifetime: "Lifetime",
  }

  const planColors = {
    free: "bg-neutral-800 text-neutral-300 border-neutral-700",
    pro: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    lifetime: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  }

  const currentPlan = profile?.plan || "free"

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white transition-colors hover:bg-white/10"
      >
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 font-bold text-[10px]">
          {user.email?.charAt(0).toUpperCase() || "U"}
        </div>
        <span className="hidden sm:inline max-w-[120px] truncate">{user.email}</span>
        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${planColors[currentPlan]}`}>
          {planLabels[currentPlan]}
        </span>
        <ChevronDown className="h-3 w-3 text-neutral-400" />
      </button>

      {isDropdownOpen && (
        <div 
          className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-neutral-900 p-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150"
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div className="border-b border-white/10 p-2 text-xs">
            <p className="font-medium text-white truncate">{user.email}</p>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Тариф: <span className="font-semibold text-violet-300">{planLabels[currentPlan]}</span>
            </p>
            {currentPlan === 'free' && (
              <p className="text-[11px] text-neutral-400">
                Осталось: <span className="text-white font-medium">{Math.max(0, (profile?.generations_limit || 3) - (profile?.generations_used || 0))} из 3</span>
              </p>
            )}
          </div>

          <div className="p-1">
            <a
              href="/#pricing"
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-neutral-300 hover:bg-white/5 hover:text-white"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Улучшить тариф</span>
            </a>

            <button
              onClick={() => {
                signOut()
                setIsDropdownOpen(false)
              }}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Выйти</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
