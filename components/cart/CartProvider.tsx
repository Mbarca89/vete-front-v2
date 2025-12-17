"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { CartItem } from "@/types/cart"

type CartContextValue = {
  items: CartItem[]
  hydrated: boolean
  totalItems: number
  subtotal: number
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void
  removeItem: (id: number) => void
  setQuantity: (id: number, qty: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = "vdp_cart_v1"

function safeParse(json: string | null): CartItem[] {
  if (!json) return []
  try {
    const data = JSON.parse(json)
    if (!Array.isArray(data)) return []
    return data
      .filter(Boolean)
      .map((x: any) => ({
        id: Number(x.id),
        name: String(x.name ?? ""),
        price: Number(x.price ?? 0),
        thumbnail: x.thumbnail ?? null,
        categoryName: x.categoryName ?? null,
        quantity: Math.max(1, Number(x.quantity ?? 1)),
      }))
      .filter((x) => Number.isFinite(x.id) && x.name && Number.isFinite(x.price))
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  // hydrate
  useEffect(() => {
    const initial = safeParse(localStorage.getItem(STORAGE_KEY))
    setItems(initial)
    setHydrated(true)
  }, [])

  // persist
  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  const totalItems = useMemo(
    () => items.reduce((acc, it) => acc + it.quantity, 0),
    [items]
  )

  const subtotal = useMemo(
    () => items.reduce((acc, it) => acc + it.quantity * it.price, 0),
    [items]
  )

  const value: CartContextValue = {
    items,
    hydrated,
    totalItems,
    subtotal,
    addItem: (item, qty = 1) => {
      const q = Math.max(1, qty)
      setItems((prev) => {
        const found = prev.find((p) => p.id === item.id)
        if (found) {
          return prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + q } : p))
        }
        return [...prev, { ...item, quantity: q }]
      })
    },
    removeItem: (id) => setItems((prev) => prev.filter((p) => p.id !== id)),
    setQuantity: (id, qty) => {
      const q = Math.max(1, qty)
      setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: q } : p)))
    },
    clear: () => setItems([]),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>")
  return ctx
}
