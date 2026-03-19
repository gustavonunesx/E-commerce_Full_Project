"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useCallback } from "react"

type Props = {
  statusAtual: string
  origemAtual: string
  periodoAtual: string
}

export default function FiltrosPedidos({ statusAtual, origemAtual, periodoAtual }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === "todos") {
        params.delete(key)
      } else {
        params.set(key, value)
      }
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  const btnBase = "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border"
  const btnAtivo = "bg-primary text-primary-foreground border-primary"
  const btnInativo = "bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground"

  return (
    <div className="bg-background rounded-2xl border border-border p-4 space-y-3">
      {/* Status */}
      <div>
        <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">
          Status
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "todos", label: "Todos" },
            { value: "pendente", label: "Pendente" },
            { value: "confirmado", label: "Confirmado" },
            { value: "pronto", label: "Pronto" },
            { value: "entregue", label: "Entregue" },
            { value: "cancelado", label: "Cancelado" },
          ].map((s) => (
            <button
              key={s.value}
              onClick={() => updateFilter("status", s.value)}
              className={`${btnBase} ${statusAtual === s.value ? btnAtivo : btnInativo}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Origem */}
      <div>
        <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">
          Origem
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "todos", label: "Todos" },
            { value: "site", label: "Site" },
            { value: "ifood", label: "iFood" },
            { value: "balcao", label: "Balcão" },
          ].map((o) => (
            <button
              key={o.value}
              onClick={() => updateFilter("origem", o.value)}
              className={`${btnBase} ${origemAtual === o.value ? btnAtivo : btnInativo}`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Período */}
      <div>
        <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">
          Período
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "todos", label: "Todos" },
            { value: "hoje", label: "Hoje" },
            { value: "semana", label: "Esta semana" },
            { value: "mes", label: "Este mês" },
          ].map((p) => (
            <button
              key={p.value}
              onClick={() => updateFilter("periodo", p.value)}
              className={`${btnBase} ${periodoAtual === p.value ? btnAtivo : btnInativo}`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}