"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Plus, Check } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useProducts } from "@/contexts/products-context"
import type { Product } from "@/lib/products"

function ProductCard({ product }: { product: Product }) {
  const { addItem, items } = useCart()
  const [added, setAdded] = useState(false)

  const inCartQuantity = items.find((i) => i.id === String(product.id))?.quantity ?? 0
  const isOutOfStock = product.estoque <= 0 || inCartQuantity >= product.estoque

  const handleAddToCart = () => {
    if (isOutOfStock) {
      alert("Produto sem estoque disponível")
      return
    }

    addItem({
      id: String(product.id),
      name: product.nome,
      price: product.preco,
      image: product.imagem_url,
      category: product.categoria,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  return (
    <div className="group bg-background rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.imagem_url}
          alt={product.nome}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={added || isOutOfStock}
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
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="bg-muted px-2 py-1 rounded">
            Estoque: {Math.max(0, product.estoque - inCartQuantity)}
          </span>
          {isOutOfStock && (
            <span className="bg-destructive/10 text-destructive px-2 py-1 rounded">
              Esgotado
            </span>
          )}
        </div>
        <span className="inline-block mt-3 text-xs text-muted-foreground/70 bg-muted px-2 py-1 rounded">
          {product.categoria}
        </span>
      </div>
    </div>
  )
}

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
        {/* Header */}
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
            Clique no + para adicionar itens à sua sacola
          </p>
        </div>

        {/* Category Filter */}
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

        {/* Products Grid */}
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

        {/* Info */}
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