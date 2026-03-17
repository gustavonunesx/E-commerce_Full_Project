"use client"

import { useState, useEffect } from "react"
import { useRealtimePedidos, type NovoPedido } from "../pedidos/use-realtime-pedidos"
import { ShoppingBag, X, Bell } from "lucide-react"

function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

const origemLabels: Record<string, string> = {
  site: "Site",
  ifood: "iFood",
  balcao: "Balcão",
}

type ToastPedido = NovoPedido & { toastId: string }

export default function NotificacaoPedidos() {
  const [toasts, setToasts] = useState<ToastPedido[]>([])

  const { contadorNovos, limparContador } = useRealtimePedidos({
    onNovoPedido: (pedido) => {
      const toast: ToastPedido = {
        ...pedido,
        toastId: crypto.randomUUID(),
      }
      setToasts((prev) => [toast, ...prev].slice(0, 5)) // máximo 5 toasts

      // Remove o toast automaticamente após 15 segundos
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.toastId !== toast.toastId))
      }, 15000)
    },
  })

  const removerToast = (toastId: string) => {
    setToasts((prev) => prev.filter((t) => t.toastId !== toastId))
  }

  return (
    <>
      {/* Badge de novos pedidos (aparece no topo da página de pedidos) */}
      {contadorNovos > 0 && (
        <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-xl px-4 py-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Bell className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {contadorNovos} novo{contadorNovos > 1 ? "s" : ""} pedido{contadorNovos > 1 ? "s" : ""}
              </p>
              <p className="text-xs text-muted-foreground">
                desde que você abriu esta página
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              limparContador()
              window.location.reload()
            }}
            className="text-xs px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
          >
            Ver pedidos
          </button>
        </div>
      )}

      {/* Toasts no canto inferior direito */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.toastId}
            className="pointer-events-auto bg-background border border-border rounded-2xl shadow-xl p-4 w-80 animate-in slide-in-from-right duration-300"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <ShoppingBag className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  Novo pedido!
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {origemLabels[toast.origem] ?? toast.origem} ·{" "}
                  {formatPrice(toast.total)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Pedido #{toast.id}
                </p>
              </div>
              <button
                onClick={() => removerToast(toast.toastId)}
                className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Barra de progresso */}
            <div className="mt-3 h-0.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{
                  animation: "shrink 15s linear forwards",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </>
  )
}