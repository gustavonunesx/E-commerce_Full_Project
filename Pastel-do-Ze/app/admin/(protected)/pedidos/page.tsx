import { createClient } from "@/lib/supabase/server"
import { ShoppingBag } from "lucide-react"
import PedidoCard from "./pedido-card"
import FiltrosPedidos from "./filtros-pedidos"
import NotificacaoPedidos from "../pedidos/notificacao-pedidos"

function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

export default async function PedidosPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; origem?: string; periodo?: string }>
}) {
  const supabase = await createClient()
  const { status, origem, periodo } = await searchParams

  let query = supabase
    .from("pedidos")
    .select(`
      *,
      itens_pedido (
        id,
        quantidade,
        preco_unitario,
        subtotal,
        produtos ( nome, categoria )
      )
    `)
    .order("criado_em", { ascending: false })

  if (status && status !== "todos") {
    query = query.eq("status", status)
  }

  if (origem && origem !== "todos") {
    query = query.eq("origem", origem)
  }

  if (periodo) {
    const hoje = new Date()
    if (periodo === "hoje") {
      hoje.setHours(0, 0, 0, 0)
      query = query.gte("criado_em", hoje.toISOString())
    } else if (periodo === "semana") {
      hoje.setDate(hoje.getDate() - 7)
      query = query.gte("criado_em", hoje.toISOString())
    } else if (periodo === "mes") {
      hoje.setDate(1)
      hoje.setHours(0, 0, 0, 0)
      query = query.gte("criado_em", hoje.toISOString())
    }
  }

  const { data: pedidos } = await query

  const { data: contadores } = await supabase
    .from("pedidos")
    .select("status")

  const contagemStatus = (contadores ?? []).reduce((acc, p) => {
    acc[p.status] = (acc[p.status] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)

  const totalFiltrado = pedidos?.length ?? 0
  const totalReceita = pedidos?.reduce((sum, p) => sum + p.total, 0) ?? 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Pedidos</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie e acompanhe todos os pedidos recebidos
        </p>
      </div>

      {/* Notificação realtime — aparece quando chega pedido novo */}
      <NotificacaoPedidos />

      {/* Badges de status */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: "pendente",   label: "Pendentes",   cor: "bg-amber-100 text-amber-800 border-amber-200" },
          { key: "confirmado", label: "Confirmados", cor: "bg-blue-100 text-blue-800 border-blue-200" },
          { key: "pronto",     label: "Prontos",     cor: "bg-purple-100 text-purple-800 border-purple-200" },
          { key: "entregue",   label: "Entregues",   cor: "bg-green-100 text-green-800 border-green-200" },
          { key: "cancelado",  label: "Cancelados",  cor: "bg-red-100 text-red-800 border-red-200" },
        ].map((s) => (
          <div
            key={s.key}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${s.cor}`}
          >
            {s.label}
            <span className="font-bold">{contagemStatus[s.key] ?? 0}</span>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <FiltrosPedidos
        statusAtual={status ?? "todos"}
        origemAtual={origem ?? "todos"}
        periodoAtual={periodo ?? "todos"}
      />

      {/* Resumo */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {totalFiltrado} pedido{totalFiltrado !== 1 ? "s" : ""} encontrado{totalFiltrado !== 1 ? "s" : ""}
        </p>
        <p className="text-sm font-medium text-foreground">
          Total: {formatPrice(totalReceita)}
        </p>
      </div>

      {/* Lista de pedidos */}
      {pedidos && pedidos.length > 0 ? (
        <div className="space-y-3">
          {pedidos.map((pedido: any) => (
            <PedidoCard key={pedido.id} pedido={pedido} />
          ))}
        </div>
      ) : (
        <div className="bg-background rounded-2xl border border-border p-12 text-center">
          <ShoppingBag className="w-10 h-10 mx-auto mb-3 text-muted-foreground/30" />
          <p className="text-muted-foreground">Nenhum pedido encontrado</p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Tente mudar os filtros ou aguarde novos pedidos
          </p>
        </div>
      )}
    </div>
  )
}