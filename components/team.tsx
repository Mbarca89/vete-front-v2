import { Card, CardContent } from "@/components/ui/card"

const team = [
  {
    name: "Dra. María González",
    role: "Veterinaria Principal",
    specialty: "Medicina Interna",
    image: "/female-veterinarian-professional-portrait.jpg",
  },
  {
    name: "Dr. Carlos Rodríguez",
    role: "Cirujano Veterinario",
    specialty: "Cirugía y Traumatología",
    image: "/male-veterinarian-professional-portrait.jpg",
  },
  {
    name: "Dra. Ana Martínez",
    role: "Especialista en Cardiología",
    specialty: "Cardiología Veterinaria",
    image: "/female-veterinarian-with-stethoscope-portrait.jpg",
  },
]

export function Team() {
  return (
    <section id="equipo" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Nuestro Equipo</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Profesionales altamente capacitados dedicados al bienestar de tu mascota
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="border-border overflow-hidden bg-background">
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
      </div>
    </section>
  )
}
