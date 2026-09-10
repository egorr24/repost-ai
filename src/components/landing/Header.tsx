"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sparkles, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserMenu } from "@/components/auth/UserMenu"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-neutral-950/80 backdrop-blur-md border-white/10 py-3"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-violet-600/20 p-2 rounded-lg group-hover:bg-violet-600/30 transition-colors">
            <Sparkles className="w-5 h-5 text-violet-400" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">RepostAI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm text-neutral-300 hover:text-white transition-colors">
            Возможности
          </Link>
          <Link href="#pricing" className="text-sm text-neutral-300 hover:text-white transition-colors">
            Цены
          </Link>
          <Link href="#faq" className="text-sm text-neutral-300 hover:text-white transition-colors">
            FAQ
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <UserMenu />
          <Button asChild size="sm">
            <Link href="/dashboard">Дашборд</Link>
          </Button>
        </div>

        <button
          className="md:hidden text-neutral-300 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-neutral-950 border-b border-white/10 p-4 flex flex-col gap-4 shadow-xl">
          <Link 
            href="#features" 
            className="text-neutral-300 hover:text-white p-2 rounded-md hover:bg-white/5"
            onClick={() => setMobileMenuOpen(false)}
          >
            Возможности
          </Link>
          <Link 
            href="#pricing" 
            className="text-neutral-300 hover:text-white p-2 rounded-md hover:bg-white/5"
            onClick={() => setMobileMenuOpen(false)}
          >
            Цены
          </Link>
          <Link 
            href="#faq" 
            className="text-neutral-300 hover:text-white p-2 rounded-md hover:bg-white/5"
            onClick={() => setMobileMenuOpen(false)}
          >
            FAQ
          </Link>
          <div className="h-px bg-white/10 my-2" />
          <Link 
            href="/login" 
            className="text-neutral-300 hover:text-white p-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Войти
          </Link>
          <Button asChild className="w-full">
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>Начать бесплатно</Link>
          </Button>
        </div>
      )}
    </header>
  )
}
