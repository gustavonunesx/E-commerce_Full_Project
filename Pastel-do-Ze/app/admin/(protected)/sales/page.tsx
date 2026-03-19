import { createClient } from "@/lib/supabase/server"
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag } from "lucide-react"

function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export default async function FinanceiroPage() {
  const supabase = await createClient()

  const [
    { data: transacoes },
    { data: pedidosPorOrigem },
  ] = await Promise.all([
    supabase
      .from("transacoes_financeiras")
      .select("*")
      .order("criado_em", { ascending: false }),

    supabase
      .from("pedidos")
      .select("origem, total, criado_em")
      .eq("status", "entregue")
      .order("criado_em", { ascending: false }),
  ])

  // Métricas gerais
  const receitas = transacoes?.filter((t) => t.tipo === "receita") ?? []
  const despesas = transacoes?.filter((t) => t.tipo === "despesa") ?? []

  const totalReceitas = receitas.reduce((sum, t) => sum + t.valor, 0)
  const totalDespesas = despesas.reduce((sum, t) => sum + t.valor, 0)
  const lucroLiquido = totalReceitas - totalDespesas

  // Receita do mês atual
  const inicioMes = new Date()
  inicioMes.setDate(1)
  inicioMes.setHours(0, 0, 0, 0)

  const receitaMes = receitas
    .filter((t) => new Date(t.criado_em) >= inicioMes)
    .reduce((sum, t) => sum + t.valor, 0)

  const despesaMes = despesas
    .filter((t) => new Date(t.criado_em) >= inicioMes)
    .reduce((sum, t) => sum + t.valor, 0)

  // Receita por origem
  const receitaSite = receitas
    .filter((t) => t.categoria === "venda_site")
    .reduce((sum, t) => sum + t.valor, 0)

  const receitaIfood = receitas
    .filter((t) => t.categoria === "venda_ifood")
    .reduce((sum, t) => sum + t.valor, 0)

  const receitaBalcao = receitas
    .filter((t) => t.categoria === "venda_balcao")
    .reduce((sum, t) => sum + t.valor, 0)

  // Receita por categoria de despesa
  const despesasPorCategoria = despesas.reduce((acc, t) => {
    acc[t.categoria] = (acc[t.categoria] ?? 0) + t.valor
    return acc
  }, {} as Record<string, number>)

  const categoriasLabel: Record<string, string> = {
    ingredientes: "Ingredientes",
    aluguel: "Aluguel",
    energia: "Energia",
    funcionarios: "Funcionários",
    outros: "Outros",
    venda_site: "Venda Site",
    venda_ifood: "Venda iFood",
    venda_balcao: "Venda Balcão",
  }

  const tipoColors: Record<string, string> = {
    receita: "text-green-600",
    despesa: "text-red-600",
  }

  const categoriaColors: Record<string, string> = {
    venda_site: "bg-blue-100 text-blue-800",
    venda_ifood: "bg-orange-100 text-orange-800",
    venda_balcao: "bg-purple-100 text-purple-800",
    ingredientes: "bg-yellow-100 text-yellow-800",
    aluguel: "bg-red-100 text-red-800",
    energia: "bg-red-100 text-red-800",
    funcionarios: "bg-red-100 text-red-800",
    outros: "bg-gray-100 text-gray-800",
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Financeiro</h1>
        <p className="text-muted-foreground mt-1">Receitas e despesas do negócio</p>
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
            {formatPrice(totalReceitas)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">desde o início</p>
        </div>

        <div className="bg-background rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Despesa Total</p>
            <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-red-700" />
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-foreground">
            {formatPrice(totalDespesas)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">desde o início</p>
        </div>

        <div className="bg-background rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Lucro Líquido</p>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${lucroLiquido >= 0 ? "bg-green-100" : "bg-red-100"}`}>
              <DollarSign className={`w-4 h-4 ${lucroLiquido >= 0 ? "text-green-700" : "text-red-700"}`} />
            </div>
          </div>
          <p className={`font-serif text-2xl font-bold ${lucroLiquido >= 0 ? "text-green-600" : "text-red-600"}`}>
            {formatPrice(lucroLiquido)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">receitas − despesas</p>
        </div>

        <div className="bg-background rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Este Mês</p>
            <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-blue-700" />
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-green-600">
            +{formatPrice(receitaMes)}
          </p>
          <p className="text-xs text-red-500 mt-1">−{formatPrice(despesaMes)} em despesas</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Receita por canal */}
        <div className="bg-background rounded-2xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="font-semibold text-foreground">Receita por Canal</h2>
          </div>
          <div className="p-6 space-y-4">
            {[
              { label: "Site (WhatsApp)", valor: receitaSite, cor: "bg-blue-500" },
              { label: "iFood", valor: receitaIfood, cor: "bg-orange-500" },
              { label: "Balcão", valor: receitaBalcao, cor: "bg-purple-500" },
            ].map((canal) => {
              const pct = totalReceitas > 0 ? (canal.valor / totalReceitas) * 100 : 0
              return (
                <div key={canal.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground">{canal.label}</span>
                    <span className="text-sm font-medium text-foreground">
                      {formatPrice(canal.valor)}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${canal.cor} rounded-full transition-all`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{pct.toFixed(1)}% do total</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Despesas por categoria */}
        <div className="bg-background rounded-2xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="font-semibold text-foreground">Despesas por Categoria</h2>
          </div>
          <div className="divide-y divide-border">
            {Object.keys(despesasPorCategoria).length > 0 ? (
              Object.entries(despesasPorCategoria)
                .sort((a, b) => (b[1] as number) - (a[1] as number))
                .map(([cat, valor]) => (
                  <div key={cat} className="p-4 flex items-center justify-between">
                    <span className="text-sm text-foreground">
                      {categoriasLabel[cat] ?? cat}
                    </span>
                    <span className="text-sm font-semibold text-red-600">
                      {formatPrice(valor)}
                    </span>
                  </div>
                ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <p className="text-sm">Nenhuma despesa registrada</p>
              </div>
            )}
          </div>
        </div>

        {/* Lançar despesa */}
        <div className="bg-background rounded-2xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="font-semibold text-foreground">Lançar Despesa</h2>
          </div>
          <div className="p-6">
            <LancarDespesa />
          </div>
        </div>
      </div>

      {/* Histórico de transações */}
      <div className="bg-background rounded-2xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="font-semibold text-foreground">Histórico de Transações</h2>
        </div>
        <div className="divide-y divide-border">
          {transacoes && transacoes.length > 0 ? (
            transacoes.map((t: any) => (
              <div key={t.id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-foreground truncate">
                      {t.descricao ?? categoriasLabel[t.categoria] ?? t.categoria}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${categoriaColors[t.categoria] ?? "bg-muted text-muted-foreground"}`}>
                      {categoriasLabel[t.categoria] ?? t.categoria}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{formatDate(t.criado_em)}</p>
                </div>
                <span className={`font-semibold whitespace-nowrap ${tipoColors[t.tipo]}`}>
                  {t.tipo === "receita" ? "+" : "−"}{formatPrice(t.valor)}
                </span>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <p className="text-sm">Nenhuma transação registrada</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Componente client para o formulário de despesa
import LancarDespesa from "./lancar-despesa"