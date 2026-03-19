"use client"

import { useState, useEffect } from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "O melhor pastel que já comi na vida! A massa é incrivelmente crocante e o recheio é super generoso. Virei cliente fiel!",
    author: "Maria Helena",
    role: "Cliente há 5 anos",
    rating: 5,
  },
  {
    quote:
      "Trago minha família todo domingo. O caldo de cana é fresquinho e o atendimento é sempre com um sorriso. Tradição de verdade!",
    author: "Roberto Almeida",
    role: "Cliente há 10 anos",
    rating: 5,
  },
  {
    quote:
      "O pastel de camarão é divino! Vocês conseguem manter a qualidade mesmo depois de tantos anos. Parabéns pelo trabalho!",
    author: "Ana Paula",
    role: "Cliente há 3 anos",
    rating: 5,
  },
  {
    quote:
      "Comecei a vir aqui com meu avô quando era criança. Hoje trago meus filhos. É mais que uma pastelaria, é uma memória afetiva.",
    author: "Carlos Eduardo",
    role: "Cliente há 20 anos",
    rating: 5,
  },
]

export function Testimonials() {
  const { ref, isInView } = useInView({ threshold: 0.2 })
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const next = () => {
    setIsAutoPlaying(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setIsAutoPlaying(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="depoimentos" className="py-24 md:py-32 bg-primary" ref={ref}>
      <div className="container mx-auto px-6">
        <div
          className={cn(
            "max-w-4xl mx-auto text-center transition-all duration-1000 ease-out",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Quote Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-foreground/10 rounded-full mb-8">
            <Quote className="w-8 h-8 text-primary-foreground" />
          </div>

          {/* Rating Stars */}
          <div className="flex items-center justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-primary-foreground text-primary-foreground" />
            ))}
          </div>

          {/* Testimonial Content */}
          <div className="relative h-[180px] md:h-[140px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 transition-all duration-500",
                  index === current
                    ? "opacity-100 translate-y-0"
                    : index < current
                    ? "opacity-0 -translate-y-8"
                    : "opacity-0 translate-y-8"
                )}
              >
                <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-primary-foreground leading-relaxed mb-8 italic text-balance">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </div>
            ))}
          </div>

          {/* Author */}
          <div className="mt-8">
            <p className="text-lg text-primary-foreground font-medium">
              {testimonials[current].author}
            </p>
            <p className="text-sm text-primary-foreground/70">
              {testimonials[current].role}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground transition-all duration-300 hover:bg-primary-foreground/10 hover:scale-110"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setCurrent(index)
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === current
                      ? "bg-primary-foreground w-8"
                      : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
                  )}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground transition-all duration-300 hover:bg-primary-foreground/10 hover:scale-110"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
