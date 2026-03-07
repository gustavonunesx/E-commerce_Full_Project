// app/admin/page.tsx
"use client"

import { useMemo } from "react"
import { useSales } from "@/contexts/sales-context"
import { format } from "date-fns"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function AdminDashboardPage() {
  const { sales } = useSales()

  const totalRevenue = useMemo(
    () => sales.reduce((sum, sale) => sum + sale.total, 0),
    [sales]
  )

  const monthlyRevenue = useMemo(() => {
    const now = new Date()
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
      return {
        label: format(date, "MMM/yy"),
        start: date,
        end: new Date(date.getFullYear(), date.getMonth() + 1, 1),
      }
    })

    return months.map((month) => ({
      month: month.label,
      revenue: sales
        .filter((sale) => {
          const saleDate = new Date(sale.date)
          return saleDate >= month.start && saleDate < month.end
        })
        .reduce((sum, sale) => sum + sale.total, 0),
    }))
  }, [sales])

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Painel Administrativo</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border p-4">
          <h2 className="text-sm font-semibold text-slate-600">Receita total</h2>
          <p className="text-3xl font-bold">R$ {totalRevenue.toFixed(2)}</p>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="text-sm font-semibold text-slate-600">Total de vendas</h2>
          <p className="text-3xl font-bold">{sales.length}</p>
        </div>
      </div>

      <div className="rounded-lg border p-4 mt-6">
        <h2 className="text-lg font-semibold mb-4">Receita dos últimos 6 meses</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyRevenue} margin={{ top: 10, right: 18, left: 0, bottom: 0 }}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
              <Line type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}