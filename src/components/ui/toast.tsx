"use client"

import * as React from "react"

interface ToastProps {
  message: string
  visible: boolean
  onClose: () => void
}

export function Toast({ message, visible, onClose }: ToastProps) {
  React.useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [visible, onClose])

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-5">
      <div className="rounded-lg border border-gray-800 bg-gray-900 px-6 py-3 text-sm font-medium text-gray-200 shadow-lg">
        {message}
      </div>
    </div>
  )
}
