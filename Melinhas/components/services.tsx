"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Plus, Check } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

const products: Product[] = [
  // Pastéis Clássicos
  { id: "pastel-carne", name: "Pastel de Carne", description: "Carne moída temperada com especiarias secretas", price: 12, image: "/images/products/pastel-carne.jpg", category: "Pastéis Clássicos" },
  { id: "pastel-queijo", name: "Pastel de Queijo", description: "Queijo mussarela derretido e cremoso", price: 10, image: "/images/products/pastel-queijo.jpg", category: "Pastéis Clássicos" },
  { id: "pastel-frango", name: "Pastel de Frango", description: "Frango desfiado com tempero caseiro", price: 12, image: "/images/products/pastel-frango.jpg", category: "Pastéis Clássicos" },
  { id: "pastel-palmito", name: "Pastel de Palmito", description: "Palmito de qualidade premium", price: 14, image: "/images/products/pastel-palmito.jpg", category: "Pastéis Clássicos" },
  
  // Pastéis Especiais
  { id: "pastel-camarao", name: "Pastel de Camarão", description: "Camarão fresco com catupiry cremoso", price: 18, image: "/images/products/pastel-camarao.jpg", category: "Pastéis Especiais" },
  { id: "pastel-4queijos", name: "Pastel 4 Queijos", description: "Mussarela, provolone, gorgonzola e parmesão", price: 16, image: "/images/products/pastel-4queijos.jpg", category: "Pastéis Especiais" },
  
  // Pastéis Doces
  { id: "pastel-chocolate", name: "Pastel de Chocolate", description: "Chocolate meio amargo derretido", price: 10, image: "/images/products/pastel-chocolate.jpg", category: "Pastéis Doces" },
  { id: "pastel-banana", name: "Pastel de Banana", description: "Banana caramelizada com canela e açúcar", price: 10, image: "/images/products/pastel-banana.jpg", category: "Pastéis Doces" },
  
  // Panquecas
  { id: "panqueca-carne", name: "Panqueca de Carne", description: "Carne moída com molho de tomate caseiro", price: 18, image: "/images/products/panqueca-carne.jpg", category: "Panquecas" },
  { id: "panqueca-frango", name: "Panqueca de Frango", description: "Frango desfiado com molho branco cremoso", price: 18, image: "/images/products/panqueca-frango.jpg", category: "Panquecas" },
  
  // Bebidas
  { id: "caldo-cana", name: "Caldo de Cana", description: "Cana fresca moída na hora", price: 8, image: "/images/products/caldo-cana.jpg", category: "Bebidas" },
  { id: "refrigerante", name: "Refrigerante", description: "Lata 350ml - Diversos sabores", price: 6, image: "/images/products/refrigerante.jpg", category: "Bebidas" },
]

const categories = ["Todos", "Pastéis Clássicos", "Pastéis Especiais", "Pastéis Doces", "Panquecas", "Bebidas"]

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
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
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={added}
          className={cn(
            "absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
            added 
              ? "bg-green-500 text-white scale-110" 
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
            {product.name}
          </h3>
          <span className="text-primary font-bold whitespace-nowrap">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <span className="inline-block mt-3 text-xs text-muted-foreground/70 bg-muted px-2 py-1 rounded">
          {product.category}
        </span>
      </div>
    </div>
  )
}

export function Services() {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  const [activeCategory, setActiveCategory] = useState("Todos")

  const filteredProducts = activeCategory === "Todos" 
    ? products 
    : products.filter(p => p.category === activeCategory)

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
