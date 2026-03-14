"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { createClient } from "@/lib/supabase/client"
import type { Product } from "@/lib/products"

type ProductsContextType = {
  products: Product[]
  loading: boolean
  addProduct: (product: Omit<Product, "id" | "criado_em">) => Promise<void>
  updateProduct: (product: Product) => Promise<void>
  removeProduct: (id: number) => Promise<void>
  getProductById: (id: number) => Product | undefined
  categories: string[]
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  // Busca produtos do banco ao carregar
  useEffect(() => {
    async function fetchProducts() {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("ativo", true)
    .order("categoria")

  console.log("Produtos retornados:", data)
  console.log("Erro:", error)

  if (!error && data) {
    setProducts(data)
  }
  setLoading(false)
}


    fetchProducts()
  }, [])

  const addProduct = async (product: Omit<Product, "id" | "criado_em">) => {
    const { data, error } = await supabase
      .from("produtos")
      .insert(product)
      .select()
      .single()

    if (!error && data) {
      setProducts((prev) => [...prev, data])
    }
  }

  const updateProduct = async (product: Product) => {
    const { error } = await supabase
      .from("produtos")
      .update(product)
      .eq("id", product.id)

    if (!error) {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p))
      )
    }
  }

  const removeProduct = async (id: number) => {
    // Não deleta do banco — só marca como inativo
    const { error } = await supabase
      .from("produtos")
      .update({ ativo: false })
      .eq("id", id)

    if (!error) {
      setProducts((prev) => prev.filter((p) => p.id !== id))
    }
  }

  const getProductById = (id: number) => products.find((p) => p.id === id)

  const categories = useMemo(() => {
    const unique = new Set<string>()
    products.forEach((p) => unique.add(p.categoria))
    return ["Todos", ...Array.from(unique)]
  }, [products])

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        addProduct,
        updateProduct,
        removeProduct,
        getProductById,
        categories,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error("useProducts precisa ser usado dentro de ProductsProvider")
  return ctx
}