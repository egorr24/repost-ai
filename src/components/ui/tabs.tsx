"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsProps {
  defaultValue: string
  className?: string
  children: React.ReactNode
}

interface TabsContextType {
  value: string
  setValue: (value: string) => void
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined)

export function Tabs({ defaultValue, className, children }: TabsProps) {
  const [value, setValue] = React.useState(defaultValue)

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex space-x-2 rounded-lg bg-gray-900/50 p-1", className)}>
      {children}
    </div>
  )
}

export function TabsTrigger({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error("TabsTrigger must be used within Tabs")

  const isSelected = context.value === value

  return (
    <button
      onClick={() => context.setValue(value)}
      className={cn(
        "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all",
        isSelected
          ? "bg-gray-800 text-white shadow-sm"
          : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200",
        className
      )}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error("TabsContent must be used within Tabs")

  if (context.value !== value) return null

  return (
    <div className={cn("mt-4 animate-in fade-in zoom-in-95 duration-200", className)}>
      {children}
    </div>
  )
}
