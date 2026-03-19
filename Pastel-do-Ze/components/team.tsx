"use client"

import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { Instagram, Linkedin } from "lucide-react"

const team = [
  {
    name: "Dra. Carolina Mendes",
    role: "Fundadora & Fisioterapeuta",
    image: "/images/instructor.jpg",
    bio: "Especialista em pilates clínico com mais de 15 anos de experiência.",
  },
  {
    name: "Fernanda Santos",
    role: "Instrutora Senior",
    image: "/images/instructor.jpg",
    bio: "Certificada internacionalmente em pilates reformer e solo.",
  },
  {
    name: "Lucas Oliveira",
    role: "Instrutor de Pilates",
    image: "/images/instructor.jpg",
    bio: "Especializado em pilates para atletas e performance esportiva.",
  },
]

export function Team() {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section id="equipe" className="py-24 md:py-32 bg-secondary" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ease-out",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-block text-sm tracking-widest text-primary uppercase mb-4">
            Nossa Equipe
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-balance">
            Profissionais apaixonados pelo que fazem
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={cn(
                "group relative bg-card rounded-2xl overflow-hidden transition-all duration-700",
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Social Icons */}
                <div className="absolute bottom-4 left-4 flex gap-3 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <a
                    href="#"
                    className="w-10 h-10 flex items-center justify-center bg-card/90 backdrop-blur-sm rounded-full transition-colors duration-300 hover:bg-primary"
                  >
                    <Instagram className="w-5 h-5 text-foreground" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 flex items-center justify-center bg-card/90 backdrop-blur-sm rounded-full transition-colors duration-300 hover:bg-primary"
                  >
                    <Linkedin className="w-5 h-5 text-foreground" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl mb-1">{member.name}</h3>
                <p className="text-sm text-primary mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
