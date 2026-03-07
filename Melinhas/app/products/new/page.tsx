// app/admin/products/new/page.tsx
"use client"

import { useState } from "react"
import { useProducts } from "@/contexts/products-context" // veja seção abaixo

export default function AdminNewProductPage() {
  const { addProduct } = useProducts()
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    addProduct({
      id: crypto.randomUUID(),
      name,
      price: Number(price),
      category: "Pastel",
      image: "/images/pastel-placeholder.png",
    })
    setName("")
    setPrice("")
    alert("Produto adicionado com sucesso!")
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Adicionar novo produto</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <label className="block">
          <span>Nome</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded border px-3 py-2"
          />
        </label>

        <label className="block">
          <span>Preço</span>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            type="number"
            step="0.01"
            className="w-full rounded border px-3 py-2"
          />
        </label>

        <button type="submit" className="inline-flex items-center rounded bg-slate-900 px-4 py-2 text-white">
          Adicionar
        </button>
      </form>
    </>
  )
}