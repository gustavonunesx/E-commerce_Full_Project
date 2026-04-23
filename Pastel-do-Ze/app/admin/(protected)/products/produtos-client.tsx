"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"
import { Pencil, Trash2, X, Package, Plus } from "lucide-react"

function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

type Produto = {
  id: number
  nome: string
  descricao: string
  preco: number
  categoria: string
  imagem_url: string
  estoque: number
  estoque_minimo: number
  ativo: boolean
}

type Props = {
  produtos: Produto[]
  categorias: string[]
}

export default function ProdutosClient({ produtos: produtosIniciais, categorias }: Props) {
  const [produtos, setProdutos] = useState<Produto[]>(produtosIniciais)
  const [mostrarForm, setMostrarForm] = useState(false)

  const totalAtivos = produtos.filter((p) => p.ativo).length
  const totalInativos = produtos.filter((p) => !p.ativo).length

  // Agrupa por categoria
  const porCategoria = produtos.reduce((acc, p) => {
    if (!acc[p.categoria]) acc[p.categoria] = []
    acc[p.categoria].push(p)
    return acc
  }, {} as Record<string, Produto[]>)

  const atualizarProduto = (produto: Produto) => {
    setProdutos((prev) => prev.map((p) => (p.id === produto.id ? produto : p)))
  }

  const removerProduto = (id: number) => {
    setProdutos((prev) => prev.filter((p) => p.id !== id))
  }

  const adicionarProduto = (produto: Produto) => {
    setProdutos((prev) => [...prev, produto])
    setMostrarForm(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Produtos</h1>
          <p className="text-muted-foreground mt-1">
            {totalAtivos} ativos · {totalInativos} inativos
          </p>
        </div>
        <button
          onClick={() => setMostrarForm(!mostrarForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all shrink-0"
        >
          {mostrarForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {mostrarForm ? "Cancelar" : "Novo Produto"}
        </button>
      </div>

      {/* Formulário de novo produto */}
      {mostrarForm && (
        <div className="bg-background rounded-2xl border border-border p-6">
          <h2 className="font-semibold text-foreground mb-6">Novo Produto</h2>
          <FormProduto
            categorias={categorias}
            onSucesso={(novoProduto) => adicionarProduto(novoProduto)}
          />
        </div>
      )}

      {/* Produtos por categoria */}
      {Object.keys(porCategoria).length > 0 ? (
        Object.entries(porCategoria).map(([categoria, produtosCat]) => (
          <div key={categoria}>
            <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              {categoria}
              <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {produtosCat.length}
              </span>
            </h2>
            <div className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-6 pb-3 -mx-6 px-6 lg:-mx-8 lg:px-8 lg:scroll-px-8 items-start [scrollbar-width:thin]">
              {produtosCat.map((produto) => (
                <div
                  key={produto.id}
                  className="snap-start shrink-0 w-44 sm:w-56"
                >
                  <ProdutoCard
                    produto={produto}
                    categorias={categorias}
                    onAtualizar={atualizarProduto}
                    onRemover={removerProduto}
                  />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="bg-background rounded-2xl border border-border p-12 text-center">
          <Package className="w-10 h-10 mx-auto mb-3 text-muted-foreground/30" />
          <p className="text-muted-foreground">Nenhum produto cadastrado</p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Clique em "Novo Produto" para começar
          </p>
        </div>
      )}
    </div>
  )
}

// ─── ProdutoCard ───────────────────────────────────────────────────────────────

type CardProps = {
  produto: Produto
  categorias: string[]
  onAtualizar: (p: Produto) => void
  onRemover: (id: number) => void
}

function ProdutoCard({ produto, categorias, onAtualizar, onRemover }: CardProps) {
  const [ativo, setAtivo] = useState(produto.ativo)
  const [editando, setEditando] = useState(false)
  const [deletando, setDeletando] = useState(false)
  const supabase = createClient()

  const toggleAtivo = async () => {
    const novoAtivo = !ativo
    const { error } = await supabase
      .from("produtos")
      .update({ ativo: novoAtivo })
      .eq("id", produto.id)

    if (!error) {
      setAtivo(novoAtivo)
      onAtualizar({ ...produto, ativo: novoAtivo })
    }
  }

  const deletarProduto = async () => {
    if (!confirm(`Deletar "${produto.nome}" permanentemente?`)) return
    setDeletando(true)
    const { error } = await supabase.from("produtos").delete().eq("id", produto.id)
    if (!error) onRemover(produto.id)
    setDeletando(false)
  }

  return (
    <div className={`bg-background rounded-2xl border overflow-hidden transition-all ${ativo ? "border-border" : "border-border opacity-60"}`}>
      {/* Imagem */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {produto.imagem_url ? (
          <Image
            src={produto.imagem_url}
            alt={produto.nome}
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs sm:text-sm">
            Sem imagem
          </div>
        )}
        <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2">
          <span className={`text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full font-medium ${ativo ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
            {ativo ? "Ativo" : "Inativo"}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-0.5 sm:gap-2 mb-1">
          <h3 className="font-medium text-foreground text-xs sm:text-sm leading-tight line-clamp-1">{produto.nome}</h3>
          <span className="font-bold text-primary text-sm whitespace-nowrap leading-tight">
            {formatPrice(produto.preco)}
          </span>
        </div>
        <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-2 mb-2.5 sm:mb-3 leading-snug">{produto.descricao}</p>

        {/* Ações */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={toggleAtivo}
            className={`flex-1 py-1.5 rounded-xl text-[11px] sm:text-xs font-medium transition-all border ${
              ativo
                ? "border-red-200 text-red-600 hover:bg-red-50"
                : "border-green-200 text-green-600 hover:bg-green-50"
            }`}
          >
            {ativo ? "Desativar" : "Ativar"}
          </button>
          <button
            onClick={() => setEditando(!editando)}
            className="p-1.5 border border-border rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            aria-label={editando ? "Cancelar edição" : "Editar"}
          >
            {editando ? <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>
          <button
            onClick={deletarProduto}
            disabled={deletando}
            className="p-1.5 border border-border rounded-xl text-muted-foreground hover:text-destructive hover:border-destructive transition-all disabled:opacity-50"
            aria-label="Deletar"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Formulário de edição inline */}
        {editando && (
          <div className="mt-4 pt-4 border-t border-border">
            <FormProduto
              categorias={categorias}
              produto={produto}
              onSucesso={(atualizado) => {
                onAtualizar(atualizado)
                setEditando(false)
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

// ─── FormProduto ───────────────────────────────────────────────────────────────

type FormProps = {
  categorias: string[]
  produto?: Produto
  onSucesso: (produto: Produto) => void
}

function FormProduto({ categorias, produto, onSucesso }: FormProps) {
  const editando = !!produto
  const supabase = createClient()

  const [nome, setNome] = useState(produto?.nome ?? "")
  const [descricao, setDescricao] = useState(produto?.descricao ?? "")
  const [preco, setPreco] = useState(produto?.preco?.toString() ?? "")
  const [categoria, setCategoria] = useState(produto?.categoria ?? categorias[0])
  const [imagem_url, setImagemUrl] = useState(produto?.imagem_url ?? "")
  const [estoque_minimo, setEstoqueMinimo] = useState(produto?.estoque_minimo?.toString() ?? "5")
  const [salvando, setSalvando] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome || !preco) return
    setSalvando(true)

    const dados = {
      nome: nome.trim(),
      descricao: descricao.trim(),
      preco: parseFloat(preco.replace(",", ".")),
      categoria,
      imagem_url: imagem_url.trim(),
      estoque_minimo: parseInt(estoque_minimo) || 5,
      estoque: produto?.estoque ?? 0,
      ativo: produto?.ativo ?? true,
    }

    if (editando) {
      const { data } = await supabase
        .from("produtos")
        .update(dados)
        .eq("id", produto.id)
        .select()
        .single()
      if (data) onSucesso(data)
    } else {
      const { data } = await supabase
        .from("produtos")
        .insert(dados)
        .select()
        .single()
      if (data) onSucesso(data)
    }

    setSalvando(false)
    setSucesso(true)
    setTimeout(() => setSucesso(false), 1500)
  }

  const inputClass = "w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
  const labelClass = "text-sm font-medium text-foreground block mb-1.5"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Nome</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Pastel de Carne" className={inputClass} required />
      </div>
      <div>
        <label className={labelClass}>Descrição</label>
        <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descreva o produto..." className={inputClass} rows={2} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Preço (R$)</label>
          <input type="text" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="0,00" className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Estoque mínimo</label>
          <input type="number" value={estoque_minimo} onChange={(e) => setEstoqueMinimo(e.target.value)} min={0} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Categoria</label>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className={inputClass}>
          {categorias.map((c) => (<option key={c} value={c}>{c}</option>))}
        </select>
      </div>
      <div>
        <label className={labelClass}>URL da Imagem</label>
        <input type="text" value={imagem_url} onChange={(e) => setImagemUrl(e.target.value)} placeholder="https://..." className={inputClass} />
        <p className="text-xs text-muted-foreground mt-1">Faça upload no Supabase Storage e cole a URL aqui</p>
      </div>
      <button type="submit" disabled={salvando || sucesso} className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium transition-all hover:bg-primary/90 disabled:opacity-50">
        {sucesso ? (editando ? "Atualizado!" : "Adicionado!") : salvando ? "Salvando..." : editando ? "Salvar Alterações" : "Adicionar Produto"}
      </button>
    </form>
  )
}