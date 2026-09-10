"use client"

import * as React from "react"
import { X, CheckCircle2, QrCode, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  planName: string
  planPrice: string
}

export function PaymentModal({ isOpen, onClose, planName, planPrice }: PaymentModalProps) {
  const [telegramOrEmail, setTelegramOrEmail] = React.useState("")
  const [isSuccess, setIsSuccess] = React.useState(false)

  if (!isOpen) return null

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (!telegramOrEmail.trim()) return

    // Save lead in localStorage or submit to backend
    const orders = JSON.parse(localStorage.getItem("repostai_orders") || "[]")
    orders.push({
      planName,
      planPrice,
      contact: telegramOrEmail,
      date: new Date().toISOString()
    })
    localStorage.setItem("repostai_orders", JSON.stringify(orders))

    setIsSuccess(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-neutral-900 p-6 sm:p-8 text-white shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-medium text-violet-300 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Быстрое подключение</span>
            </div>

            <h3 className="text-2xl font-bold mb-2">Оформление: {planName}</h3>
            <p className="text-neutral-400 text-sm mb-6">
              Стоимость: <span className="text-white font-bold text-lg">{planPrice}</span>. Доступ активируется сразу после оплаты.
            </p>

            <form onSubmit={handleOrder} className="space-y-4">
              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1.5">
                  Ваш Telegram никнейм или Email для получения доступа:
                </label>
                <input
                  type="text"
                  required
                  placeholder="@username или your@mail.ru"
                  value={telegramOrEmail}
                  onChange={(e) => setTelegramOrEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                />
              </div>

              <div className="rounded-xl border border-white/5 bg-white/5 p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-400">Способ оплаты:</span>
                  <span className="font-semibold text-violet-300 flex items-center gap-1.5">
                    <QrCode className="w-4 h-4" />
                    СБП / Карты МИР / T-Pay
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Оплата моментально зачисляется через СБП без комиссии.
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full text-base font-semibold py-6">
                Оплатить {planPrice} через СБП 🚀
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-neutral-500">
                Или напишите напрямую в Telegram для быстрой покупки:{" "}
                <a 
                  href="https://t.me/repostai_support" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-violet-400 hover:underline"
                >
                  @repostai_support
                </a>
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4 animate-in zoom-in-50" />
            <h4 className="text-2xl font-bold mb-2">Заявка принята!</h4>
            <p className="text-neutral-300 text-sm mb-6">
              Мы зафиксировали тариф <span className="font-bold text-white">{planName}</span> для контакта <span className="text-violet-300">{telegramOrEmail}</span>.
            </p>
            <p className="text-xs text-neutral-400 mb-6">
              Чтобы моментально завершить оплату и получить ключ без ожидания, напишите нам в Telegram:
            </p>
            <Button size="lg" className="w-full" asChild>
              <a 
                href={`https://t.me/repostai_support?text=Здравствуйте!%20Хочу%20оплатить%20тариф%20${encodeURIComponent(planName)}%20(${encodeURIComponent(planPrice)}).%20Мой%20контакт:%20${encodeURIComponent(telegramOrEmail)}`}
                target="_blank" 
                rel="noreferrer"
              >
                <Send className="w-4 h-4 mr-2" />
                Написать в Telegram для оплаты
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
