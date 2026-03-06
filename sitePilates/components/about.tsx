"use client"

import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

const stats = [
  { value: "12+", label: "Anos de Experiência" },
  { value: "5.000+", label: "Alunos Atendidos" },
  { value: "98%", label: "Taxa de Satisfação" },
]

export function About() {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section id="sobre" className="py-24 md:py-32 bg-card" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div
            className={cn(
              "relative transition-all duration-1000 ease-out",
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            )}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/pilates-class.jpg"
                alt="Aula de Pilates"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-primary/20 rounded-2xl -z-10" />
          </div>

          {/* Content Side */}
          <div
            className={cn(
              "transition-all duration-1000 ease-out delay-200",
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            )}
          >
            <span className="inline-block text-sm tracking-widest text-primary uppercase mb-4">
              Sobre Nós
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-balance">
              Dedicados ao seu bem-estar há mais de uma década
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                O Equilíbrio Pilates nasceu da paixão por transformar vidas através
                do movimento consciente. Nosso método combina técnicas tradicionais
                do pilates com abordagens contemporâneas, oferecendo uma experiência
                única e personalizada.
              </p>
              <p>
                Com uma equipe de profissionais altamente qualificados e um ambiente
                acolhedor, criamos o espaço perfeito para você desenvolver força,
                flexibilidade e consciência corporal.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={cn(
                    "transition-all duration-700",
                    isInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  )}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="font-serif text-3xl md:text-4xl text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
