"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import Image from "next/image"

const menuItems = [
  {
    category: "Pastéis Clássicos",
    items: [
      { name: "Carne", description: "Carne moída temperada com especiarias secretas", price: "R$ 12,00" },
      { name: "Queijo", description: "Queijo mussarela derretido e cremoso", price: "R$ 10,00" },
      { name: "Frango", description: "Frango desfiado com tempero caseiro", price: "R$ 12,00" },
      { name: "Palmito", description: "Palmito de qualidade premium", price: "R$ 14,00" },
    ]
  },
  {
    category: "Pastéis Especiais",
    items: [
      { name: "Camarão", description: "Camarão fresco com catupiry cremoso", price: "R$ 18,00" },
      { name: "4 Queijos", description: "Mussarela, provolone, gorgonzola e parmesão", price: "R$ 16,00" },
      { name: "Calabresa Acebolada", description: "Calabresa artesanal com cebola caramelizada", price: "R$ 14,00" },
      { name: "Carne Seca", description: "Carne seca desfiada com cream cheese", price: "R$ 16,00" },
    ]
  },
  {
    category: "Pastéis Doces",
    items: [
      { name: "Chocolate", description: "Chocolate meio amargo derretido", price: "R$ 10,00" },
      { name: "Banana com Canela", description: "Banana caramelizada com canela e açúcar", price: "R$ 10,00" },
      { name: "Romeu e Julieta", description: "Goiabada cascão com queijo minas", price: "R$ 12,00" },
      { name: "Doce de Leite", description: "Doce de leite cremoso artesanal", price: "R$ 10,00" },
    ]
  }
]

const bebidas = [
  { name: "Caldo de Cana", price: "R$ 8,00", description: "Cana fresca moída na hora" },
  { name: "Caldo de Cana c/ Limão", price: "R$ 9,00", description: "Com limão tahiti" },
  { name: "Caldo de Cana c/ Abacaxi", price: "R$ 10,00", description: "Com abacaxi fresco" },
  { name: "Refrigerante", price: "R$ 6,00", description: "Lata 350ml" },
  { name: "Água Mineral", price: "R$ 4,00", description: "Com ou sem gás" },
]

export function Services() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="cardapio" className="py-24 md:py-32 bg-muted" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ease-out",
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
            Todos os nossos pastéis são preparados na hora, com massa crocante e recheios generosos
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {menuItems.map((category, categoryIndex) => (
            <div
              key={category.category}
              className={cn(
                "bg-background rounded-2xl p-8 shadow-lg transition-all duration-700",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${categoryIndex * 150}ms` }}
            >
              <h3 className="font-serif text-2xl text-foreground mb-6 pb-4 border-b border-border">
                {category.category}
              </h3>
              <div className="space-y-6">
                {category.items.map((item) => (
                  <div key={item.name} className="group">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                        {item.name}
                      </h4>
                      <span className="text-primary font-semibold">{item.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bebidas Section */}
        <div
          className={cn(
            "bg-secondary rounded-2xl p-8 lg:p-12 transition-all duration-1000",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: "450ms" }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-serif text-3xl text-secondary-foreground mb-6">
                Bebidas
              </h3>
              <p className="text-secondary-foreground/80 mb-8">
                Nosso famoso caldo de cana é extraído na hora, garantindo o máximo de frescor e sabor. 
                A combinação perfeita para acompanhar seu pastel!
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {bebidas.map((bebida) => (
                  <div key={bebida.name} className="bg-background/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-secondary-foreground font-medium">{bebida.name}</span>
                      <span className="text-primary-foreground bg-primary px-2 py-0.5 rounded text-sm font-semibold">
                        {bebida.price}
                      </span>
                    </div>
                    <p className="text-sm text-secondary-foreground/70">{bebida.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/caldo-cana.jpg"
                alt="Caldo de cana fresquinho"
                fill
                className="object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className={cn(
            "text-center mt-12 transition-all duration-1000",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: "600ms" }}
        >
          <p className="text-muted-foreground mb-4">
            Fazemos combos especiais! Consulte no balcão.
          </p>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-xl"
          >
            Fazer Pedido
          </a>
        </div>
      </div>
    </section>
  )
}
