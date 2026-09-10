"use client"

import { useEffect, useState, useCallback } from "react"
import { supabase, isSupabaseConfigured } from "./client"
import { User } from "@supabase/supabase-js"

export interface UserProfile {
  id: string
  email: string
  plan: 'free' | 'pro' | 'lifetime'
  generations_used: number
  generations_limit: number
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async (userId: string) => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (data && !error) {
        setProfile(data as UserProfile)
      } else {
        // Fallback default profile
        setProfile({
          id: userId,
          email: user?.email || '',
          plan: 'free',
          generations_used: 0,
          generations_limit: 3,
        })
      }
    } catch (err) {
      console.warn('Error fetching profile:', err)
    } finally {
      setLoading(false)
    }
  }, [user?.email])

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      if (currentUser) {
        fetchProfile(currentUser.id)
      } else {
        setLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser = session?.user ?? null
        setUser(currentUser)
        if (currentUser) {
          fetchProfile(currentUser.id)
        } else {
          setProfile(null)
          setLoading(false)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [fetchProfile])

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut()
    }
    setUser(null)
    setProfile(null)
  }

  return {
    user,
    profile,
    loading,
    isConfigured: isSupabaseConfigured,
    refreshProfile: () => user && fetchProfile(user.id),
    signOut,
  }
}
