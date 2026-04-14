import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ShoppingBag, TrendingUp, Package, AlertTriangle, ArrowUpRight, Clock } from "lucide-react"

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

  const [
    { data: pedidos },
    { data: transacoes },
    { data: produtos },
    { data: pedidosHoje },
  ] = await Promise.all([
    supabase
      .from("pedidos")
      .select("*, itens_pedido(quantidade, preco_unitario, produtos(nome))")
      .order("criado_em", { ascending: false })
      .limit(10),

    supabase
      .from("transacoes_financeiras")
      .select("valor, criado_em, categoria")
      .eq("tipo", "receita"),

    supabase
      .from("produtos")
      .select("id, nome, estoque, estoque_minimo, categoria")
      .eq("ativo", true)
      .order("estoque", { ascending: true })
      .limit(5),

    supabase
      .from("pedidos")
      .select("id, total")
      .gte("criado_em", new Date().toISOString().split("T")[0]),
  ])

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

  const statusConfig: Record<string, { label: string; className: string }> = {
    pendente:   { label: "Pendente",   className: "bg-amber-100 text-amber-800 border border-amber-200" },
    confirmado: { label: "Confirmado", className: "bg-blue-100 text-blue-800 border border-blue-200" },
    pronto:     { label: "Pronto",     className: "bg-violet-100 text-violet-800 border border-violet-200" },
    entregue:   { label: "Entregue",   className: "bg-emerald-100 text-emerald-800 border border-emerald-200" },
    cancelado:  { label: "Cancelado",  className: "bg-red-100 text-red-800 border border-red-200" },
  }

  const origemLabels: Record<string, string> = {
    site:   "Site",
    ifood:  "iFood",
    balcao: "Balcão",
  }

  const metrics = [
    {
      label: "Receita Total",
      value: formatPrice(receitaTotal),
      sub: "desde o início",
      icon: TrendingUp,
      accent: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-50",
      text: "text-emerald-700",
    },
    {
      label: "Receita do Mês",
      value: formatPrice(receitaMes),
      sub: new Date().toLocaleDateString("pt-BR", { month: "long" }),
      icon: ArrowUpRight,
      accent: "from-blue-500 to-indigo-500",
      bg: "bg-blue-50",
      text: "text-blue-700",
    },
    {
      label: "Pedidos Hoje",
      value: String(totalPedidosHoje),
      sub: `${formatPrice(receitaHoje)} em vendas`,
      icon: ShoppingBag,
      accent: "from-primary to-orange-500",
      bg: "bg-orange-50",
      text: "text-orange-700",
    },
    {
      label: "Estoque Baixo",
      value: String(produtosEstoqueBaixo.length),
      sub: produtosEstoqueBaixo.length === 0 ? "Tudo em ordem" : "produtos precisam reposição",
      icon: AlertTriangle,
      accent: "from-rose-500 to-pink-500",
      bg: "bg-rose-50",
      text: "text-rose-700",
    },
  ]

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary to-primary/80 rounded-2xl p-6 lg:p-8 text-white">
        <div className="relative z-10">
          <p className="text-white/60 text-xs uppercase tracking-widest font-medium mb-1">
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <h1 className="font-serif text-2xl lg:text-3xl font-bold">
            Bom dia, bem-vindo de volta 👋
          </h1>
          <p className="text-white/60 text-sm mt-1">Confira o resumo de hoje</p>
        </div>
        {/* Decorative circles */}
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute -bottom-12 -right-4 w-56 h-56 rounded-full bg-white/5" />
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="bg-background rounded-2xl p-3 sm:p-5 border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <p className="text-xs sm:text-sm text-muted-foreground leading-tight">{m.label}</p>
              <div className={`w-7 h-7 sm:w-9 sm:h-9 ${m.bg} rounded-xl flex items-center justify-center shrink-0 ml-1`}>
                <m.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${m.text}`} />
              </div>
            </div>
            <p className="font-serif text-lg sm:text-2xl font-bold text-foreground leading-tight">{m.value}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 leading-tight">{m.sub}</p>
            <div className={`mt-3 sm:mt-4 h-1 w-full rounded-full bg-gradient-to-r ${m.accent} opacity-30 group-hover:opacity-70 transition-opacity`} />
          </div>
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Últimos Pedidos */}
        <div className="lg:col-span-2 bg-background rounded-2xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-5 bg-primary rounded-full" />
              <h2 className="font-semibold text-foreground">Últimos Pedidos</h2>
            </div>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="divide-y divide-border">
            {pedidos && pedidos.length > 0 ? (
              pedidos.map((pedido: any) => {
                const sc = statusConfig[pedido.status]
                return (
                  <div key={pedido.id} className="px-6 py-3.5 flex items-center justify-between gap-4 hover:bg-muted/40 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-sm font-semibold text-foreground">
                          #{pedido.id}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sc?.className ?? "bg-muted text-muted-foreground"}`}>
                          {sc?.label ?? pedido.status}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {origemLabels[pedido.origem] ?? pedido.origem}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {formatDate(pedido.criado_em)}
                        {pedido.nome_cliente && ` · ${pedido.nome_cliente}`}
                      </p>
                    </div>
                    <span className="font-semibold text-foreground whitespace-nowrap text-sm">
                      {formatPrice(pedido.total)}
                    </span>
                  </div>
                )
              })
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-20" />
                <p className="text-sm">Nenhum pedido ainda</p>
              </div>
            )}
          </div>
        </div>

        {/* Estoque */}
        <div className="bg-background rounded-2xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center gap-2">
            <div className="w-1.5 h-5 bg-amber-500 rounded-full" />
            <h2 className="font-semibold text-foreground">Estoque</h2>
          </div>
          <div className="divide-y divide-border">
            {produtos && produtos.length > 0 ? (
              produtos.map((produto: any) => {
                const baixo = produto.estoque <= produto.estoque_minimo
                const pct = Math.min(100, (produto.estoque / (produto.estoque_minimo * 3 || 1)) * 100)
                return (
                  <div key={produto.id} className="px-6 py-4">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{produto.nome}</p>
                        <p className="text-xs text-muted-foreground">{produto.categoria}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {baixo && <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />}
                        <span className={`text-sm font-bold ${baixo ? "text-red-500" : "text-foreground"}`}>
                          {produto.estoque}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${baixo ? "bg-red-400" : "bg-emerald-400"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                <Package className="w-10 h-10 mx-auto mb-3 opacity-20" />
                <p className="text-sm">Nenhum produto</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
