"use client"

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import type { Product } from "@/lib/products"
import { defaultProducts } from "@/lib/products"

type ProductsContextType = {
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  removeProduct: (id: string) => void
  getProductById: (id: string) => Product | undefined
  categories: string[]
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("melinhas-products")
    if (stored) {
      try {
        setProducts(JSON.parse(stored))
        return
      } catch {
        // ignore parse errors
      }
    }

    setProducts(defaultProducts)
  }, [])

  useEffect(() => {
    localStorage.setItem("melinhas-products", JSON.stringify(products))
  }, [products])

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product])
  }

  const updateProduct = (product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)))
  }

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const getProductById = (id: string) => products.find((p) => p.id === id)

  const categories = useMemo(() => {
    const unique = new Set<string>()
    products.forEach((p) => unique.add(p.category))
    return ["Todos", ...Array.from(unique)]
  }, [products])

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, removeProduct, getProductById, categories }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error("useProducts precisa ser usado dentro de ProductsProvider")
  return ctx
}
