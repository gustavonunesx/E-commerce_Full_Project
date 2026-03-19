import { createClient } from "@/lib/supabase/server"
import ProdutosClient from "../products/produtos-client"

const categorias = [
  "Pastéis Clássicos",
  "Pastéis Especiais",
  "Pastéis Doces",
  "Panquecas",
  "Bebidas",
]

export default async function ProdutosPage() {
  const supabase = await createClient()

  const { data: produtos } = await supabase
    .from("produtos")
    .select("*")
    .order("categoria")
    .order("nome")

  return (
    <ProdutosClient
      produtos={produtos ?? []}
      categorias={categorias}
    />
  )
}