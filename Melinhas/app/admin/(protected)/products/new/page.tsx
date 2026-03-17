// app/admin/products/new/page.tsx
"use client"

import { useState } from "react"
import { useProducts } from "@/contexts/products-context"

export default function AdminNewProductPage() {
  const { addProduct } = useProducts()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("/images/pastel-placeholder.png")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [stock, setStock] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!name.trim() || !price.trim() || !category.trim() || !stock.trim()) {
      alert("Preencha todos os campos")
      return
    }

    addProduct({
      id: crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      category: category.trim(),
      image: image.trim() || "/images/pastel-placeholder.png",
      stock: Number(stock),
    })

    setName("")
    setDescription("")
    setImage("/images/pastel-placeholder.png")
    setPrice("")
    setCategory("")
    setStock("")

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
          <span>Descrição</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded border px-3 py-2"
            rows={3}
          />
        </label>

        <label className="block">
          <span>Imagem (URL)</span>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
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

        <div className="grid gap-4 md:grid-cols-2">
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

          <label className="block">
            <span>Estoque</span>
            <input
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              type="number"
              min={0}
              className="w-full rounded border px-3 py-2"
            />
          </label>
        </div>

        <button type="submit" className="inline-flex items-center rounded bg-slate-900 px-4 py-2 text-white">
          Adicionar
        </button>
      </form>
    </>
  )
}
