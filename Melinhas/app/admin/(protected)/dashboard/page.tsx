import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ShoppingBag, TrendingUp, Package, AlertTriangle } from "lucide-react"

function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/admin/login")

  // Busca dados em paralelo para ser mais rápido
  const [
    { data: pedidos },
    { data: transacoes },
    { data: produtos },
    { data: pedidosHoje },
  ] = await Promise.all([
    // Últimos 10 pedidos
    supabase
      .from("pedidos")
      .select("*, itens_pedido(quantidade, preco_unitario, produtos(nome))")
      .order("criado_em", { ascending: false })
      .limit(10),

    // Receita total e do mês
    supabase
      .from("transacoes_financeiras")
      .select("valor, criado_em, categoria")
      .eq("tipo", "receita"),

    // Produtos com estoque baixo
    supabase
      .from("produtos")
      .select("id, nome, estoque, estoque_minimo, categoria")
      .eq("ativo", true)
      .order("estoque", { ascending: true })
      .limit(5),

    // Pedidos de hoje
    supabase
      .from("pedidos")
      .select("id, total")
      .gte("criado_em", new Date().toISOString().split("T")[0]),
  ])

  // Calcula métricas
  const receitaTotal = transacoes?.reduce((sum, t) => sum + t.valor, 0) ?? 0

  const inicioMes = new Date()
  inicioMes.setDate(1)
  inicioMes.setHours(0, 0, 0, 0)
  const receitaMes = transacoes
    ?.filter((t) => new Date(t.criado_em) >= inicioMes)
    .reduce((sum, t) => sum + t.valor, 0) ?? 0

  const totalPedidosHoje = pedidosHoje?.length ?? 0
  const receitaHoje = pedidosHoje?.reduce((sum, p) => sum + p.total, 0) ?? 0

  const produtosEstoqueBaixo = produtos?.filter(
    (p) => p.estoque <= p.estoque_minimo
  ) ?? []

  const statusColors: Record<string, string> = {
    pendente: "bg-amber-100 text-amber-800",
    confirmado: "bg-blue-100 text-blue-800",
    pronto: "bg-purple-100 text-purple-800",
    entregue: "bg-green-100 text-green-800",
    cancelado: "bg-red-100 text-red-800",
  }

  const origemLabels: Record<string, string> = {
    site: "Site",
    ifood: "iFood",
    balcao: "Balcão",
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Cards de métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-background rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Receita Total</p>
            <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-700" />
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-foreground">
            {formatPrice(receitaTotal)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">desde o início</p>
        </div>

        <div className="bg-background rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Receita do Mês</p>
            <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-blue-700" />
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-foreground">
            {formatPrice(receitaMes)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {new Date().toLocaleDateString("pt-BR", { month: "long" })}
          </p>
        </div>

        <div className="bg-background rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Pedidos Hoje</p>
            <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-primary" />
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-foreground">
            {totalPedidosHoje}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {formatPrice(receitaHoje)} em vendas
          </p>
        </div>

        <div className="bg-background rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Estoque Baixo</p>
            <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-700" />
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-foreground">
            {produtosEstoqueBaixo.length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {produtosEstoqueBaixo.length === 0 ? "Tudo em ordem" : "produtos precisam reposição"}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Últimos pedidos */}
        <div className="lg:col-span-2 bg-background rounded-2xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="font-semibold text-foreground">Últimos Pedidos</h2>
          </div>
          <div className="divide-y divide-border">
            {pedidos && pedidos.length > 0 ? (
              pedidos.map((pedido: any) => (
                <div key={pedido.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground">
                        Pedido #{pedido.id}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[pedido.status] ?? "bg-muted text-muted-foreground"}`}>
                        {pedido.status}
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
                  <span className="font-semibold text-foreground whitespace-nowrap">
                    {formatPrice(pedido.total)}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Nenhum pedido ainda</p>
              </div>
            )}
          </div>
        </div>

        {/* Produtos com estoque baixo */}
        <div className="bg-background rounded-2xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="font-semibold text-foreground">Estoque</h2>
          </div>
          <div className="divide-y divide-border">
            {produtos && produtos.length > 0 ? (
              produtos.map((produto: any) => {
                const baixo = produto.estoque <= produto.estoque_minimo
                return (
                  <div key={produto.id} className="p-4 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {produto.nome}
                      </p>
                      <p className="text-xs text-muted-foreground">{produto.categoria}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {baixo && (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      )}
                      <span className={`text-sm font-semibold ${baixo ? "text-red-600" : "text-foreground"}`}>
                        {produto.estoque}
                      </span>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <Package className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Nenhum produto</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}