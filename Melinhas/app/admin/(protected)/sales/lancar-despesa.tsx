"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

const categorias = [
  { value: "ingredientes", label: "Ingredientes" },
  { value: "aluguel", label: "Aluguel" },
  { value: "energia", label: "Energia" },
  { value: "funcionarios", label: "Funcionários" },
  { value: "outros", label: "Outros" },
]

export default function LancarDespesa() {
  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState("")
  const [categoria, setCategoria] = useState("ingredientes")
  const [salvando, setSalvando] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!descricao || !valor) return

    setSalvando(true)
    const supabase = createClient()

    const { error } = await supabase.from("transacoes_financeiras").insert({
      tipo: "despesa",
      categoria,
      descricao,
      valor: parseFloat(valor.replace(",", ".")),
    })

    if (!error) {
      setSucesso(true)
      setDescricao("")
      setValor("")
      setCategoria("ingredientes")
      setTimeout(() => {
        setSucesso(false)
        window.location.reload()
      }, 1500)
    }

    setSalvando(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground block mb-1.5">
          Descrição
        </label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Ex: Compra de óleo"
          className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground block mb-1.5">
          Categoria
        </label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {categorias.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground block mb-1.5">
          Valor (R$)
        </label>
        <input
          type="text"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="0,00"
          className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      <button
        type="submit"
        disabled={salvando || sucesso}
        className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium transition-all hover:bg-primary/90 disabled:opacity-50"
      >
        {sucesso ? "Lançado!" : salvando ? "Salvando..." : "Lançar Despesa"}
      </button>
    </form>
  )
}