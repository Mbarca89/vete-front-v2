import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const team = [
  {
    name: "Noelia Témoli",
    role: "Secretaria",
    specialty: "",
    image: "/noe.webp",
  },
  {
    name: "Andrés Témoli",
    role: "Médico Veterinario",
    specialty: "MP: 396",
    image: "/andres.webp",
  },
  {
    name: "Agustina Lerario",
    role: "Estudiante avanzado de Veterinaria",
    specialty: "",
    image: "/agus.webp",
  },
  {
    name: "Franco Rodríguez",
    role: "Médico Veterinario",
    specialty: "MP 689",
    image: "/franco.webp",
  },
  {
    name: "Valentina Suárez",
    role: "Secretaria",
    specialty: "",
    image: "/valen.webp",
  },
]

export function About() {
  return (
    <section id="nosotros" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Sobre Nosotros</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Profesionales altamente capacitados dedicados al bienestar de tu mascota
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {team.map((member, index) => (
            <Card key={index} className="border-border overflow-hidden bg-background hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-foreground/60">{member.specialty}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Link href="/nosotros">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Conoce Más Sobre Nosotros
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
