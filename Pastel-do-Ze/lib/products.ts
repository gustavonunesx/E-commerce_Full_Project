export type Product = {
  id: number          // era string, agora é number (vem do banco)
  nome: string        // era name
  descricao: string   // era description
  preco: number       // era price
  imagem_url: string  // era image
  categoria: string   // era category
  estoque: number     // era stock
  estoque_minimo: number
  ativo: boolean
  criado_em?: string
}
