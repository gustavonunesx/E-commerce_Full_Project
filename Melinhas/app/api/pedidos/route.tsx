import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  const { items, total } = await request.json()

  // 1. Cria o pedido
  const { data: pedido, error: erroPedido } = await supabase
    .from("pedidos")
    .insert({ origem: "site", status: "pendente", total })
    .select()
    .single()

  if (erroPedido || !pedido) {
    return NextResponse.json({ error: erroPedido }, { status: 500 })
  }

  // 2. Salva os itens
  const itensPedido = items.map((item: any) => ({
    pedido_id: pedido.id,
    produto_id: Number(item.id),
    quantidade: item.quantity,
    preco_unitario: item.price,
    subtotal: item.price * item.quantity,
  }))

  await supabase.from("itens_pedido").insert(itensPedido)

  // 4. Registra receita
  await supabase.from("transacoes_financeiras").insert({
    tipo: "receita",
    categoria: "venda_site",
    descricao: `Pedido #${pedido.id} via WhatsApp`,
    valor: total,
    pedido_id: pedido.id,
  })

  return NextResponse.json({ success: true, pedidoId: pedido.id })
}