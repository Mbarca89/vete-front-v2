import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TestTube, Syringe, Scissors, Bone, SquareActivity, MemoryStick } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: TestTube,
    title: "Análisis Clínicos",
    description: "Análisis clínicos completos para detectar cualquier problema a tiempo",
  },
  {
    icon: Bone,
    title: "Diagnóstico por imágenes",
    description: "Ecografías y radiografías digitales para un diagnóstico preciso.",
  },
  {
    icon: Scissors,
    title: "Cirugía",
    description: "Procedimientos quirúrgicos con equipamiento moderno y anestesia segura.",
  },
  {
    icon: SquareActivity,
    title: "Internación",
    description: "Cuidado intensivo y monitoreo constante para mascotas hospitalizadas.",
  },
  {
    icon: Syringe,
    title: "Vacunación",
    description: "Planes de vacunación completos para proteger a tu mascota de enfermedades.",
  },
  {
    icon: MemoryStick,
    title: "Chipeado",
    description: "Servicio de chipeado para la identificación segura de tu mascota.",
  },
]

export function Services() {
  return (
    <section id="servicios" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Nuestros Servicios</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Tu mascota es parte de nuestra familia. Nos dedicamos a brindar el mejor cuidado y atención para que tu peludo amigo se mantenga feliz y saludable.
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
