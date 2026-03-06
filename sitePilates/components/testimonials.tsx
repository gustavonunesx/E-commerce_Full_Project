"use client"

import { useState, useEffect } from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "O Equilíbrio Pilates transformou minha qualidade de vida. Depois de anos com dores nas costas, finalmente encontrei alívio e ganhei força que nunca imaginei ter.",
    author: "Maria Helena",
    role: "Aluna há 3 anos",
  },
  {
    quote:
      "A atenção personalizada dos instrutores faz toda a diferença. Cada aula é adaptada às minhas necessidades e sinto uma evolução constante.",
    author: "Roberto Almeida",
    role: "Aluno há 2 anos",
  },
  {
    quote:
      "Durante minha gravidez, o pilates foi essencial. O cuidado e conhecimento da equipe me deram confiança em cada etapa da gestação.",
    author: "Juliana Costa",
    role: "Aluna há 1 ano",
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
    <section className="py-24 md:py-32 bg-primary" ref={ref}>
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

          {/* Testimonial Content */}
          <div className="relative h-[200px] md:h-[160px]">
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
