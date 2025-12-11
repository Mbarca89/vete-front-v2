import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Stethoscope, Syringe, Scissors, Heart, Clock, Pill } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Stethoscope,
    title: "Consultas Generales",
    description: "Exámenes completos y diagnósticos precisos para mantener la salud de tu mascota.",
  },
  {
    icon: Syringe,
    title: "Vacunación",
    description: "Planes de vacunación completos para proteger a tu mascota de enfermedades.",
  },
  {
    icon: Scissors,
    title: "Cirugía",
    description: "Procedimientos quirúrgicos con equipamiento moderno y anestesia segura.",
  },
  {
    icon: Heart,
    title: "Cardiología",
    description: "Diagnóstico y tratamiento de enfermedades cardíacas en mascotas.",
  },
  {
    icon: Clock,
    title: "Emergencias 24/7",
    description: "Atención de urgencias disponible las 24 horas del día, todos los días.",
  },
  {
    icon: Pill,
    title: "Farmacia",
    description: "Medicamentos y productos veterinarios de calidad para tu mascota.",
  },
]

export function Services() {
  return (
    <section id="servicios" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Nuestros Servicios</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios veterinarios para cuidar la salud integral de tu mascota
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow bg-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-card-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-card-foreground/70">{service.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <div className="text-center">
          <Link href="/servicios">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Ver Todos los Servicios</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
