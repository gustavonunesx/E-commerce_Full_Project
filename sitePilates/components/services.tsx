"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

const services = [
  {
    id: "01",
    title: "Pilates Solo",
    description:
      "Exercícios no solo com foco em fortalecimento do core, flexibilidade e consciência corporal. Ideal para iniciantes e praticantes avançados.",
    image: "/images/pilates-class.jpg",
  },
  {
    id: "02",
    title: "Pilates Reformer",
    description:
      "Aulas no reformer, equipamento que proporciona resistência e suporte, permitindo exercícios de alta precisão e eficácia.",
    image: "/images/pilates-equipment.jpg",
  },
  {
    id: "03",
    title: "Pilates Clínico",
    description:
      "Tratamento especializado para reabilitação, dores crônicas e pós-operatório, com acompanhamento fisioterapêutico.",
    image: "/images/hero-pilates.jpg",
  },
  {
    id: "04",
    title: "Pilates para Gestantes",
    description:
      "Programa especialmente desenvolvido para gestantes, focado em preparação para o parto e recuperação pós-parto.",
    image: "/images/pilates-class.jpg",
  },
]

export function Services() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="modalidades" className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          className={cn(
            "max-w-3xl mb-16 transition-all duration-1000 ease-out",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-block text-sm tracking-widest text-primary uppercase mb-4">
            Modalidades
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-balance">
            Encontre a modalidade perfeita para você
          </h2>
        </div>

        {/* Services List */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <ServiceItem
              key={service.id}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceItem({
  service,
  index,
  isInView,
}: {
  service: (typeof services)[0]
  index: number
  isInView: boolean
}) {
  return (
    <div
      className={cn(
        "group relative border-t border-border py-8 md:py-12 transition-all duration-700",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 cursor-pointer">
        {/* Number */}
        <div className="text-sm text-muted-foreground font-mono w-12">
          {service.id}
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl md:text-4xl flex-1 transition-colors duration-300 group-hover:text-primary">
          {service.title}
        </h3>

        {/* Description (Desktop) */}
        <p className="hidden lg:block text-muted-foreground max-w-md leading-relaxed">
          {service.description}
        </p>

        {/* Arrow */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full border border-border transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:scale-110">
          <ArrowUpRight className="w-5 h-5 text-muted-foreground transition-colors duration-300 group-hover:text-primary-foreground" />
        </div>
      </div>

      {/* Description (Mobile) */}
      <p className="lg:hidden text-muted-foreground mt-4 pl-0 md:pl-24 leading-relaxed">
        {service.description}
      </p>

      {/* Hover Image */}
      <div className="absolute right-24 top-1/2 -translate-y-1/2 w-64 h-48 rounded-lg overflow-hidden opacity-0 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-10 hidden xl:block">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
        />
      </div>
    </div>
  )
}
