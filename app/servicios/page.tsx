import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Stethoscope,
  Syringe,
  Scissors,
  Heart,
  Clock,
  Pill,
  AlertCircle,
  Microscope,
  Zap,
  Eye,
  Bone,
  Droplet,
} from "lucide-react"

const detailedServices = [
  {
    icon: Stethoscope,
    title: "Consultas Generales",
    description: "Exámenes completos y diagnósticos precisos para mantener la salud de tu mascota.",
    details:
      "Nuestros veterinarios realizan evaluaciones integrales incluyendo historial médico, examen físico completo y pruebas diagnósticas necesarias.",
  },
  {
    icon: Syringe,
    title: "Vacunación",
    description: "Planes de vacunación completos para proteger a tu mascota de enfermedades.",
    details:
      "Ofrecemos calendarios de vacunación personalizados según la edad y estilo de vida de tu mascota, con seguimiento regular.",
  },
  {
    icon: Scissors,
    title: "Cirugía",
    description: "Procedimientos quirúrgicos con equipamiento moderno y anestesia segura.",
    details:
      "Cirugías generales, esterilización, castración y procedimientos avanzados con tecnología de punta y monitoreo constante.",
  },
  {
    icon: Heart,
    title: "Cardiología",
    description: "Diagnóstico y tratamiento de enfermedades cardíacas en mascotas.",
    details: "Evaluación de problemas cardíacos con ecocardiografía, electrocardiograma y tratamiento especializado.",
  },
  {
    icon: Clock,
    title: "Emergencias 24/7",
    description: "Atención de urgencias disponible las 24 horas del día, todos los días.",
    details: "Servicio de urgencias y emergencias veterinarias disponible constantemente para situaciones críticas.",
  },
  {
    icon: Pill,
    title: "Farmacia",
    description: "Medicamentos y productos veterinarios de calidad para tu mascota.",
    details:
      "Contamos con amplio stock de medicamentos, suplementos y productos de calidad con asesoramiento profesional.",
  },
  {
    icon: Microscope,
    title: "Laboratorio",
    description: "Análisis clínicos especializados para diagnósticos precisos.",
    details: "Servicio de laboratorio in-situ con análisis de sangre, bioquímica y cultivos para resultados rápidos.",
  },
  {
    icon: Eye,
    title: "Oftalmología",
    description: "Atención especializada en problemas oculares.",
    details: "Evaluación y tratamiento de afecciones oftalmológicas con equipamiento oftalmológico especializado.",
  },
  {
    icon: Bone,
    title: "Traumatología",
    description: "Tratamiento de fracturas y lesiones ortopédicas.",
    details: "Diagnóstico con radiografías digitales y tratamiento quirúrgico de lesiones y fracturas óseas.",
  },
  {
    icon: Zap,
    title: "Fisioterapia",
    description: "Rehabilitación y terapia física para recuperación postoperatoria.",
    details: "Programas de rehabilitación personalizados para acelerar la recuperación y mejorar la movilidad.",
  },
  {
    icon: Droplet,
    title: "Dermatología",
    description: "Tratamiento de afecciones de piel y alergias.",
    details: "Diagnóstico y tratamiento de problemas dermatológicos, alergias y afecciones cutáneas.",
  },
  {
    icon: AlertCircle,
    title: "Odontología",
    description: "Limpieza dental y tratamiento de problemas bucales.",
    details: "Limpieza profesional, tratamiento de caries y extracciones dentales con anestesia segura.",
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

        {/* Services Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {detailedServices.map((service, index) => {
                const Icon = service.icon
                return (
                  <Card key={index} className="border-border hover:shadow-lg transition-shadow bg-card flex flex-col">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-card-foreground">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <CardDescription className="text-card-foreground/70 mb-3">{service.description}</CardDescription>
                      <p className="text-sm text-foreground/60">{service.details}</p>
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
