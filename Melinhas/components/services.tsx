"use client"

import { useState, useEffect } from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Plus, Check, X, ShoppingBag, Minus } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useProducts } from "@/contexts/products-context"
import type { Product } from "@/lib/products"
import { createPortal } from "react-dom"


type PopupProps = {
  product: Product
  onConfirmar: (observacao: string, quantidade: number) => void
  onFechar: () => void
}

function PopupProduto({ product, onConfirmar, onFechar }: PopupProps) {
  const [observacao, setObservacao] = useState("")
  const [quantidade, setQuantidade] = useState(1)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Animação de entrada
    requestAnimationFrame(() => setMounted(true))
    // Bloqueia scroll do body
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const formatPrice = (price: number) =>
    price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

  const totalItem = product.preco * quantidade

  const content = (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-end sm:items-center justify-center transition-all duration-300",
        mounted ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Overlay escuro */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onFechar}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative bg-background w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl transition-all duration-300 max-h-[90vh] flex flex-col",
          mounted ? "translate-y-0 scale-100" : "translate-y-8 scale-95"
        )}
      >
        {/* Imagem grande */}
        <div className="relative w-full aspect-[16/9] shrink-0">
          <Image
            src={product.imagem_url}
            alt={product.nome}
            fill
            sizes="(max-width: 640px) 100vw, 512px"
            className="object-cover"
            priority
          />
          {/* Gradiente sobre a imagem */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />

          {/* Botão fechar */}
          <button
            onClick={onFechar}
            className="absolute top-4 right-4 w-9 h-9 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-all hover:scale-110 shadow-lg"
            aria-label="Fechar"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {/* Conteúdo scrollável */}
        <div className="overflow-y-auto flex-1 px-6 pt-5 pb-2">
          {/* Nome e preço */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h2 className="font-serif text-2xl font-bold text-foreground leading-tight">
              {product.nome}
            </h2>
            <span className="text-primary font-bold text-xl whitespace-nowrap mt-0.5">
              {formatPrice(product.preco)}
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            {product.descricao}
          </p>

          {/* Observação */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-foreground block mb-2">
              Observações{" "}
              <span className="text-muted-foreground font-normal text-xs">(opcional)</span>
            </label>
            <textarea
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              placeholder="Ex: sem cebola, mais queijo, bem passado..."
              className="w-full px-4 py-3 rounded-2xl border border-border bg-muted/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-all"
              rows={2}
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground mt-1 text-right">
              {observacao.length}/200
            </p>
          </div>
        </div>

        {/* Footer fixo — quantidade e botão */}
        <div className="px-6 pb-6 pt-3 border-t border-border bg-background shrink-0">
          <div className="flex items-center gap-4">
            {/* Controle de quantidade */}
            <div className="flex items-center gap-3 bg-muted rounded-full px-2 py-1.5">
              <button
                onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background transition-colors disabled:opacity-30"
                disabled={quantidade <= 1}
                aria-label="Diminuir quantidade"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-6 text-center font-bold text-foreground">
                {quantidade}
              </span>
              <button
                onClick={() => setQuantidade((q) => q + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background transition-colors"
                aria-label="Aumentar quantidade"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Botão adicionar */}
            <button
              onClick={() => onConfirmar(observacao, quantidade)}
              className="flex-1 flex items-center justify-between gap-2 py-3.5 px-5 bg-primary text-primary-foreground rounded-full font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:scale-[1.02]"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Adicionar
              </span>
              <span className="font-bold">{formatPrice(totalItem)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  // Renderiza fora da hierarquia DOM usando portal
  if (typeof window === "undefined") return null
  return createPortal(content, document.body)
}

// ─── ProductCard ───────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  const { addItem, items } = useCart()
  const [added, setAdded] = useState(false)
  const [popupAberto, setPopupAberto] = useState(false)

  const inCartQuantity = items
    .filter((i) => i.id === String(product.id))
    .reduce((sum, i) => sum + i.quantity, 0)

  const isOutOfStock = product.estoque <= 0

  const formatPrice = (price: number) =>
    price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

  const handleClickAdicionar = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isOutOfStock) return
    setPopupAberto(true)
  }

  const handleConfirmar = (observacao: string, quantidade: number) => {
    for (let i = 0; i < quantidade; i++) {
      addItem({
        id: String(product.id),
        name: product.nome,
        price: product.preco,
        image: product.imagem_url,
        category: product.categoria,
        observacao: observacao.trim() || undefined,
      })
    }
    setPopupAberto(false)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <>
      <div
        className="group bg-background rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
        onClick={() => !isOutOfStock && setPopupAberto(true)}
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.imagem_url}
            alt={product.nome}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badge de quantidade no carrinho */}
          {inCartQuantity > 0 && (
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
              {inCartQuantity}
            </div>
          )}

          {/* Botão + */}
          <button
            onClick={handleClickAdicionar}
            disabled={isOutOfStock}
            className={cn(
              "absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
              added
                ? "bg-green-500 text-white scale-110"
                : isOutOfStock
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:scale-110 hover:shadow-xl"
            )}
            aria-label="Adicionar à sacola"
          >
            {added ? <Check className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-serif text-lg text-foreground font-medium group-hover:text-primary transition-colors">
              {product.nome}
            </h3>
            <span className="text-primary font-bold whitespace-nowrap">
              {formatPrice(product.preco)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.descricao}</p>
          {isOutOfStock && (
            <span className="inline-block mt-3 text-xs bg-destructive/10 text-destructive px-2 py-1 rounded">
              Esgotado
            </span>
          )}
          <span className="inline-block mt-3 text-xs text-muted-foreground/70 bg-muted px-2 py-1 rounded ml-1">
            {product.categoria}
          </span>
        </div>
      </div>

      {popupAberto && (
        <PopupProduto
          product={product}
          onConfirmar={handleConfirmar}
          onFechar={() => setPopupAberto(false)}
        />
      )}
    </>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────

export function Services() {
  const { products, categories, loading } = useProducts()
  const { ref, isInView } = useInView({ threshold: 0 })
  const [activeCategory, setActiveCategory] = useState("Todos")

  const filteredProducts =
    activeCategory === "Todos"
      ? products
      : products.filter((p) => p.categoria === activeCategory)

  if (loading) {
    return (
      <section className="py-24 bg-muted flex items-center justify-center">
        <p className="text-muted-foreground animate-pulse">Carregando cardápio...</p>
      </section>
    )
  }

  return (
    <section id="cardapio" className="py-24 md:py-32 bg-muted" ref={ref}>
      <div className="container mx-auto px-6">
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-12 transition-all duration-1000 ease-out",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-block text-sm tracking-widest text-primary uppercase mb-4 font-semibold">
            Cardápio
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-balance">
            Sabores que Encantam
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Clique no produto para adicionar à sacola
          </p>
        </div>

        <div
          className={cn(
            "flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: "150ms" }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div
          className={cn(
            "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: "300ms" }}
        >
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div
          className={cn(
            "text-center mt-12 transition-all duration-1000",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: "450ms" }}
        >
          <p className="text-muted-foreground">
            Fazemos combos especiais! Consulte no balcão ou pelo WhatsApp.
          </p>
        </div>
      </div>
    </section>
  )
}