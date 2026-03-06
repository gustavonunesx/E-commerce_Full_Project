"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-pilates.jpg"
          alt="Estúdio de Pilates"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/80 backdrop-blur-sm rounded-full mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm tracking-wide text-muted-foreground">
              Aulas presenciais e online disponíveis
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 animate-fade-in-up animation-delay-100">
            <span className="block text-foreground">Movimento é</span>
            <span className="block text-primary italic">equilíbrio</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animation-delay-200">
            Transforme seu corpo e mente através do pilates. Aulas personalizadas
            com foco em postura, flexibilidade e bem-estar.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
            <Link
              href="#agendar"
              className="group flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-xl"
            >
              <span className="tracking-wide">Agende sua Aula Experimental</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="#sobre"
              className="px-8 py-4 border border-border rounded-full text-foreground transition-all duration-300 hover:bg-secondary hover:border-primary/20"
            >
              Conheça nosso espaço
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce animation-delay-500">
          <span className="text-xs tracking-widest text-muted-foreground uppercase">
            Role para explorar
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-24 h-24 border border-primary/20 rounded-full animate-float opacity-50" />
      <div className="absolute bottom-1/3 right-16 w-16 h-16 border border-primary/30 rounded-full animate-float animation-delay-200 opacity-40" />
    </section>
  )
}
