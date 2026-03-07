export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
}

export const defaultProducts: Product[] = [
  // Pastéis Clássicos
  { id: "pastel-carne", name: "Pastel de Carne", description: "Carne moída temperada com especiarias secretas", price: 12, image: "/images/products/pastel-carne.jpg", category: "Pastéis Clássicos", stock: 20 },
  { id: "pastel-queijo", name: "Pastel de Queijo", description: "Queijo mussarela derretido e cremoso", price: 10, image: "/images/products/pastel-queijo.jpg", category: "Pastéis Clássicos", stock: 20 },
  { id: "pastel-frango", name: "Pastel de Frango", description: "Frango desfiado com tempero caseiro", price: 12, image: "/images/products/pastel-frango.jpg", category: "Pastéis Clássicos", stock: 20 },
  { id: "pastel-palmito", name: "Pastel de Palmito", description: "Palmito de qualidade premium", price: 14, image: "/images/products/pastel-palmito.jpg", category: "Pastéis Clássicos", stock: 20 },

  // Pastéis Especiais
  { id: "pastel-camarao", name: "Pastel de Camarão", description: "Camarão fresco com catupiry cremoso", price: 18, image: "/images/products/pastel-camarao.jpg", category: "Pastéis Especiais", stock: 12 },
  { id: "pastel-4queijos", name: "Pastel 4 Queijos", description: "Mussarela, provolone, gorgonzola e parmesão", price: 16, image: "/images/products/pastel-4queijos.jpg", category: "Pastéis Especiais", stock: 16 },

  // Pastéis Doces
  { id: "pastel-chocolate", name: "Pastel de Chocolate", description: "Chocolate meio amargo derretido", price: 10, image: "/images/products/pastel-chocolate.jpg", category: "Pastéis Doces", stock: 10 },
  { id: "pastel-banana", name: "Pastel de Banana", description: "Banana caramelizada com canela e açúcar", price: 10, image: "/images/products/pastel-banana.jpg", category: "Pastéis Doces", stock: 10 },

  // Panquecas
  { id: "panqueca-carne", name: "Panqueca de Carne", description: "Carne moída com molho de tomate caseiro", price: 18, image: "/images/products/panqueca-carne.jpg", category: "Panquecas", stock: 12 },
  { id: "panqueca-frango", name: "Panqueca de Frango", description: "Frango desfiado com molho branco cremoso", price: 18, image: "/images/products/panqueca-frango.jpg", category: "Panquecas", stock: 12 },

  // Bebidas
  { id: "caldo-cana", name: "Caldo de Cana", description: "Cana fresca moída na hora", price: 8, image: "/images/products/caldo-cana.jpg", category: "Bebidas", stock: 30 },
  { id: "refrigerante", name: "Refrigerante", description: "Lata 350ml - Diversos sabores", price: 6, image: "/images/products/refrigerante.jpg", category: "Bebidas", stock: 30 },
]
