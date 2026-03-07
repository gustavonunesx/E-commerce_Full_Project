"use client"

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import type { CartItem } from "@/contexts/cart-context"

export type Sale = {
  id: string
  date: string // ISO
  total: number
  items: CartItem[]
  customer?: string
}

type SalesContextType = {
  sales: Sale[]
  addSale: (sale: Omit<Sale, "id" | "date">) => void
  totalRevenue: number
  revenueLast30Days: number
}

const SalesContext = createContext<SalesContextType | undefined>(undefined)

export function SalesProvider({ children }: { children: ReactNode }) {
  const [sales, setSales] = useState<Sale[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("melinhas-sales")
    if (stored) setSales(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem("melinhas-sales", JSON.stringify(sales))
  }, [sales])

  const addSale = (sale: Omit<Sale, "id" | "date">) => {
    setSales((prev) => [
      ...prev,
      {
        ...sale,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
      },
    ])
  }

  const totalRevenue = useMemo(
    () => sales.reduce((sum, sale) => sum + sale.total, 0),
    [sales]
  )

  const revenueLast30Days = useMemo(() => {
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - 30)

    return sales
      .filter((sale) => new Date(sale.date) >= cutoff)
      .reduce((sum, sale) => sum + sale.total, 0)
  }, [sales])

  return (
    <SalesContext.Provider value={{ sales, addSale, totalRevenue, revenueLast30Days }}>
      {children}
    </SalesContext.Provider>
  )
}

export function useSales() {
  const ctx = useContext(SalesContext)
  if (!ctx) throw new Error("useSales precisa ser usado dentro de SalesProvider")
  return ctx
}