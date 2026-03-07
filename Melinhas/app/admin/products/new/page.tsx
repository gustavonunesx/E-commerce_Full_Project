// app/admin/products/new/page.tsx
"use client"

import { useState } from "react"
import { useProducts } from "@/contexts/products-context"

export default function AdminNewProductPage() {
  const { addProduct } = useProducts()
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!name.trim() || !price.trim() || !category.trim()) {
      alert("Preencha todos os campos")
      return
    }

    addProduct({
      id: crypto.randomUUID(),
      name: name.trim(),
      description: "", // você pode adicionar campo de descrição ao formulário se quiser
      price: Number(price),
      category: category.trim(),
      image: "/images/pastel-placeholder.png",
    })

    setName("")
    setPrice("")
    setCategory("")

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
          <span>Categoria</span>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
