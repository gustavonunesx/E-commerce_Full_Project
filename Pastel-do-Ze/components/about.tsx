"use client"

import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { Award, Users, Utensils, Heart } from "lucide-react"

const stats = [
  { icon: Award, value: "38+", label: "Anos de Tradição" },
  { icon: Users, value: "50K+", label: "Clientes Satisfeitos" },
  { icon: Utensils, value: "100K+", label: "Pastéis Vendidos" },
  { icon: Heart, value: "20+", label: "Sabores Únicos" },
]

export function About() {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section id="sobre" className="py-24 md:py-32 bg-background relative overflow-hidden" ref={ref}>
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/50 to-transparent" />

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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/pasteis-variados.jpg"
                    alt="Pastéis variados"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
                  <p className="font-serif text-3xl font-bold">1986</p>
                  <p className="text-sm opacity-90">Desde então</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-secondary rounded-2xl p-6 text-secondary-foreground">
                  <p className="font-serif text-3xl font-bold">100%</p>
                  <p className="text-sm opacity-90">Artesanal</p>
                </div>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/caldo-cana.jpg"
                    alt="Caldo de cana"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
              </div>
            </div>
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
            <span className="inline-block text-sm tracking-widest text-primary uppercase mb-4 font-semibold">
              Nossa História
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-balance">
              Tradição que Passa
              <span className="text-primary"> de Geração</span> em Geração
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                O Pastel do Zé começou em 1986 como uma pequena pastelaria de bairro. 
                Com dedicação e carinho, mantemos a mesma receita secreta da massa 
                e o compromisso com a qualidade em cada pastel que fazemos.
              </p>
              <p>
                Hoje somos referência na cidade, mas continuamos com a mesma filosofia: 
                ingredientes frescos, massa feita na hora e aquele atendimento de 
                quem trata cliente como família.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-border">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={cn(
                    "text-center transition-all duration-700",
                    isInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  )}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="font-serif text-2xl text-foreground font-bold mb-1">
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
