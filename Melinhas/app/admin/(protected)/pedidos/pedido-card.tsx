"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ChevronDown, ChevronUp } from "lucide-react"

function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const statusConfig: Record<string, { label: string; cor: string; next: string | null }> = {
  pendente:   { label: "Pendente",   cor: "bg-amber-100 text-amber-800",   next: "confirmado" },
  confirmado: { label: "Confirmado", cor: "bg-blue-100 text-blue-800",     next: "pronto" },
  pronto:     { label: "Pronto",     cor: "bg-purple-100 text-purple-800", next: "entregue" },
  entregue:   { label: "Entregue",   cor: "bg-green-100 text-green-800",   next: null },
  cancelado:  { label: "Cancelado",  cor: "bg-red-100 text-red-800",       next: null },
}

const origemLabels: Record<string, string> = {
  site: "Site",
  ifood: "iFood",
  balcao: "Balcão",
}

type Props = {
  pedido: any
}

export default function PedidoCard({ pedido }: Props) {
  const [status, setStatus] = useState(pedido.status)
  const [aberto, setAberto] = useState(false)
  const [atualizando, setAtualizando] = useState(false)
  const supabase = createClient()

  const config = statusConfig[status] ?? statusConfig.pendente

  const avancarStatus = async () => {
    if (!config.next) return
    setAtualizando(true)

    const { error } = await supabase
      .from("pedidos")
      .update({ status: config.next })
      .eq("id", pedido.id)

    if (!error) {
      setStatus(config.next)
    }
    setAtualizando(false)
  }

  const cancelarPedido = async () => {
    if (!confirm("Cancelar este pedido?")) return
    setAtualizando(true)

    const { error } = await supabase
      .from("pedidos")
      .update({ status: "cancelado" })
      .eq("id", pedido.id)

    if (!error) setStatus("cancelado")
    setAtualizando(false)
  }

  return (
    <div className="bg-background rounded-2xl border border-border overflow-hidden">
      {/* Header do card */}
      <div
        className="p-4 flex items-center gap-4 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setAberto(!aberto)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-sm font-semibold text-foreground">
              Pedido #{pedido.id}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.cor}`}>
              {config.label}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {origemLabels[pedido.origem] ?? pedido.origem}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {formatDate(pedido.criado_em)}
            {pedido.nome_cliente && ` · ${pedido.nome_cliente}`}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="font-semibold text-foreground">
            {formatPrice(pedido.total)}
          </span>
          {aberto ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Detalhes expandidos */}
      {aberto && (
        <div className="border-t border-border">
          {/* Itens do pedido */}
          <div className="p-4 space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
              Itens
            </p>
            {pedido.itens_pedido?.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-bold text-foreground">
                    {item.quantidade}
                  </span>
                  <span className="text-sm text-foreground">
                    {item.produtos?.nome ?? "Produto removido"}
                  </span>
                  {item.produtos?.categoria && (
                    <span className="text-xs text-muted-foreground">
                      · {item.produtos.categoria}
                    </span>
                  )}
                </div>
                <span className="text-sm text-foreground">
                  {formatPrice(item.subtotal)}
                </span>
              </div>
            ))}

            {pedido.observacao && (
              <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-xs font-medium text-amber-800 mb-0.5">Observação</p>
                <p className="text-sm text-amber-900">{pedido.observacao}</p>
              </div>
            )}
          </div>

          {/* Ações */}
          {status !== "entregue" && status !== "cancelado" && (
            <div className="p-4 border-t border-border flex items-center gap-3">
              <button
                onClick={avancarStatus}
                disabled={atualizando || !config.next}
                className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium transition-all hover:bg-primary/90 disabled:opacity-50"
              >
                {atualizando
                  ? "Salvando..."
                  : `Marcar como ${statusConfig[config.next ?? ""]?.label ?? ""}`}
              </button>
              <button
                onClick={cancelarPedido}
                disabled={atualizando}
                className="px-4 py-2.5 border border-border rounded-xl text-sm text-muted-foreground hover:text-destructive hover:border-destructive transition-all"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}