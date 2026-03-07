// app/admin/products/page.tsx
"use client"

import { useMemo, useState } from "react"
import { useProducts } from "@/contexts/products-context"

export default function AdminProductsPage() {
  const { products, updateProduct, removeProduct } = useProducts()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")

  const selectedProduct = useMemo(() => {
    return products.find((p) => p.id === editingId)
  }, [editingId, products])

  const startEditing = (id: string) => {
    const product = products.find((p) => p.id === id)
    if (!product) return
    setEditingId(id)
    setName(product.name)
    setCategory(product.category)
    setPrice(String(product.price))
  }

  const cancelEdit = () => {
    setEditingId(null)
    setName("")
    setCategory("")
    setPrice("")
  }

  const handleSave = () => {
    if (!selectedProduct) return
    if (!name.trim() || !category.trim() || !price.trim()) {
      alert("Preencha todos os campos")
      return
    }

    updateProduct({
      ...selectedProduct,
      name: name.trim(),
      category: category.trim(),
      price: Number(price),
    })

    cancelEdit()
  }

  const handleDelete = (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return
    removeProduct(id)
    if (editingId === id) cancelEdit()
  }

  const formattedProducts = useMemo(() => {
    return products
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))
  }, [products])

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Produtos</h1>
          <p className="text-sm text-muted-foreground">
            Liste, edite ou remova produtos disponíveis no cardápio.
          </p>
        </div>
        <div>
          <a
            href="/admin/products/new"
            className="inline-flex items-center justify-center rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition"
          >
            + Novo produto
          </a>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left">
          <thead className="bg-muted text-sm text-slate-600">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {formattedProducts.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">R$ {product.price.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(product.id)}
                      className="rounded bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="rounded bg-destructive px-3 py-1 text-xs font-semibold text-white hover:bg-destructive/90"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingId && selectedProduct && (
        <div className="mt-8 rounded-lg border bg-white p-6">
          <h2 className="text-lg font-semibold mb-4">Editando: {selectedProduct.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="block">
              <span className="text-sm font-medium">Nome</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Categoria</span>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Preço</span>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                step="0.01"
                className="mt-1 w-full rounded border px-3 py-2"
              />
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition"
            >
              Salvar
            </button>
            <button
              onClick={cancelEdit}
              className="inline-flex items-center justify-center rounded border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  )
}
