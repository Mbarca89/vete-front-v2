import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, Syringe, Scissors, Heart, Clock, Pill, Microscope, Eye } from "lucide-react"
import Image from "next/image"

const detailedServices = [
  {
    icon: Stethoscope,
    title: "Análisis clínicos",
    description: "Diagnósticos precisos para tu mascota",
    image: "/images/services/analisis.webp",
    details:
      "Sabemos que la salud de tu mascota es lo más importante. Por eso, ofrecemos análisis clínicos completos para detectar cualquier problema a tiempo. Desde análisis de sangre hasta pruebas específicas, estamos aquí para asegurarnos de que tu amigo de cuatro patas reciba el mejor cuidado posible.",
  },
  {
    icon: Syringe,
    title: "Cirugias",
    description: "Expertos en cuidado quirúrgico",
    image: "/images/services/cirugias.webp",
    details:
      "Entendemos lo preocupante que puede ser una cirugía. Nuestro equipo de veterinarios experimentados se encarga de cada procedimiento con el máximo cuidado y profesionalismo. Tu mascota estará en las mejores manos, y te mantendremos informado en cada paso del camino.",
  },
  {
    icon: Scissors,
    title: "Clínica médica",
    description: "Atención integral para tu mascota",
    image: "/images/services/clinica.webp",
    details:
      "Nuestro servicio de clínica médica está diseñado para atender cualquier problema de salud que pueda tener tu mascota. Desde chequeos de rutina hasta el tratamiento de enfermedades crónicas, nuestros veterinarios están aquí para brindarle a tu mascota la mejor atención médica posible. ¡Tu mascota merece lo mejor y nosotros estamos aquí para dárselo!",
  },
  {
    icon: Heart,
    title: "Chipeado de Mascotas",
    description: "Seguridad y tranquilidad",
    image: "/images/services/chipeado.webp",
    details:
      "Con un microchip del tamaño de un grano de arroz implantado de forma subcutánea, le asignamos a tu mascota un identificador único que permite acreditar tu legitima propiedad en caso de extravío y es un requerimiento legal y obligatorio para viajar por vía aérea a algunos países.",
  },
  {
    icon: Clock,
    title: "Ecografías",
    description: "Mirando dentro para una mejor atención",
    image: "/images/services/ecografia.webp",
    details:
      "Las ecografías nos permiten ver lo que sucede dentro del cuerpo de tu mascota sin necesidad de procedimientos invasivos. Ya sea para un chequeo de rutina o para diagnosticar un problema específico, nuestras ecografías son rápidas, indoloras y muy efectivas.",
  },
  {
    icon: Pill,
    title: "Internación",
    description: "Cuidado continuo para tu mascota",
    image: "/images/services/internacion.webp",
    details:
      "Si tu mascota necesita quedarse con nosotros por un tiempo, ofrecemos un servicio de internación cómodo y seguro. Nuestro equipo se encargará de que tu amigo reciba todo el cuidado y cariño que necesita, ¡como si estuviera en casa!",
  },
  {
    icon: Microscope,
    title: "Radiología digital",
    description: "Diagnósticos rápidos y precisos",
    image: "/images/services/radiografia.webp",
    details: "Servicio de laboratorio in-situ con análisis de sangre, bioquímica y cultivos para resultados rápidos.",
  },
  {
    icon: Eye,
    title: "Vacunación",
    description: "Protección esencial para tu mascota",
    image: "/images/services/vacunacion.webp",
    details:
      "Las vacunas son esenciales para mantener a tu mascota saludable y protegerla de enfermedades graves. Te ofrecemos un programa de vacunación completo adaptado a las necesidades de tu mascota. Mantén a tu peludo amigo protegido con nuestras vacunas seguras y efectivas.",
  },
]

export default function Servicios() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Nuestros Servicios</h1>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Ofrecemos una amplia gama de servicios veterinarios especializados para el cuidado integral de tu
                mascota
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {detailedServices.map((service, index) => {
                const Icon = service.icon
                return (
                  <Card
                    key={index}
                    className="border-border hover:shadow-xl transition-all duration-300 bg-card overflow-hidden group"
                  >
                    {/* Image at top with overlay */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      {/* Icon overlay on image */}
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                    </div>

                    {/* Content below image */}
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl text-card-foreground">{service.title}</CardTitle>
                      <CardDescription className="text-card-foreground/70 font-medium">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/60 leading-relaxed">{service.details}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
