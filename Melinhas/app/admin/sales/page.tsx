// app/admin/sales/page.tsx
"use client"

import { useMemo } from "react"
import { useSales } from "@/contexts/sales-context"
import { format } from "date-fns"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

export default function AdminSalesPage() {
  const { sales } = useSales()

  const revenueLast30Days = useMemo(() => {
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - 30)

    return sales
      .filter((sale) => new Date(sale.date) >= cutoff)
      .reduce((sum, sale) => sum + sale.total, 0)
  }, [sales])

  const chartData = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return date
    })

    const map = new Map<string, { day: string; revenue: number }>()
    days.forEach((date) => {
      map.set(format(date, "dd/MM"), { day: format(date, "dd/MM"), revenue: 0 })
    })

    sales.forEach((sale) => {
      const day = format(new Date(sale.date), "dd/MM")
      if (map.has(day)) {
        map.get(day)!.revenue += sale.total
      }
    })

    return Array.from(map.values())
  }, [sales])

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Vendas & Receita</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="rounded-lg border p-4">
          <h2 className="text-sm font-semibold text-slate-600">Receita últimos 30 dias</h2>
          <p className="text-3xl font-bold">R$ {revenueLast30Days.toFixed(2)}</p>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="text-sm font-semibold text-slate-600 mb-4">Últimos 7 dias</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
                <Bar dataKey="revenue" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h2 className="text-lg font-semibold mb-3">Histórico de vendas</h2>
        <table className="w-full text-left">
          <thead className="text-sm text-slate-500">
            <tr>
              <th className="py-2">Data</th>
              <th className="py-2">Cliente</th>
              <th className="py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-t">
                <td className="py-2">{format(new Date(sale.date), "dd/MM/yyyy")}</td>
                <td className="py-2">{sale.customer || "—"}</td>
                <td className="py-2">R$ {sale.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}