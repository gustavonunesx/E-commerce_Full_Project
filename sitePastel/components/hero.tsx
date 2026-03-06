"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Clock } from "lucide-react"

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/pastelaria-hero.jpg"
          alt="Pastel crocante"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/95 via-secondary/80 to-secondary/95" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float opacity-60" />
      <div className="absolute bottom-1/3 right-16 w-40 h-40 bg-primary/15 rounded-full blur-3xl animate-float animation-delay-300 opacity-50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm tracking-wide text-background">
              Aberto agora
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 animate-fade-in-up animation-delay-100">
            <span className="block text-background">O Melhor Pastel</span>
            <span className="block text-primary italic">da Cidade</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-background/90 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animation-delay-200">
            Tradição de família desde 1985. Pastéis crocantes, recheios generosos 
            e o mais puro caldo de cana fresquinho.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
            <Link
              href="#cardapio"
              className="group flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
            >
              <span className="tracking-wide font-medium">Ver Cardápio</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="#contato"
              className="px-8 py-4 border-2 border-background/50 rounded-full text-background backdrop-blur-sm transition-all duration-300 hover:bg-background hover:text-secondary"
            >
              Como Chegar
            </Link>
          </div>

          {/* Info Cards */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 animate-fade-in-up animation-delay-500">
            <div className="flex items-center gap-3 bg-background/10 backdrop-blur-sm rounded-full px-5 py-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-background text-sm">Rua das Flores, 123 - Centro</span>
            </div>
            <div className="flex items-center gap-3 bg-background/10 backdrop-blur-sm rounded-full px-5 py-3">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-background text-sm">Seg a Sáb: 8h às 20h</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce animation-delay-500">
          <span className="text-xs tracking-widest text-background/70 uppercase">
            Role para explorar
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  )
}
