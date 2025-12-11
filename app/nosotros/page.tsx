import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

const team = [
  {
    name: "Dra. María González",
    role: "Veterinaria Principal",
    specialty: "Medicina Interna",
    image: "/female-veterinarian-professional-portrait.jpg",
    bio: "Con más de 15 años de experiencia en medicina veterinaria, la Dra. González se especializa en diagnóstico integral y tratamiento de enfermedades internas.",
  },
  {
    name: "Dr. Carlos Rodríguez",
    role: "Cirujano Veterinario",
    specialty: "Cirugía y Traumatología",
    image: "/male-veterinarian-professional-portrait.jpg",
    bio: "Especialista en procedimientos quirúrgicos avanzados y traumatología. Cuenta con 12 años de experiencia en cirugías complejas.",
  },
  {
    name: "Dra. Ana Martínez",
    role: "Especialista en Cardiología",
    specialty: "Cardiología Veterinaria",
    image: "/female-veterinarian-with-stethoscope-portrait.jpg",
    bio: "Experta en diagnóstico y tratamiento de enfermedades cardíacas. Ha realizado especializaciones en cardiología veterinaria con 10 años de práctica.",
  },
]

export default function Nosotros() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Sobre Nosotros</h1>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Conoce al equipo de profesionales dedicados al bienestar de tu mascota
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-primary mb-6">Quiénes Somos</h2>
              <p className="text-lg text-foreground/70 mb-4">
                Veterinaria del Parque es una clínica veterinaria moderna y completa, dedicada a brindar atención médica
                de excelencia a tus mascotas. Con más de 25 años de trayectoria en el cuidado animal, nos hemos
                convertido en un referente en nuestra comunidad.
              </p>
              <p className="text-lg text-foreground/70 mb-4">
                Nuestro equipo está conformado por profesionales altamente capacitados, equipados con tecnología de
                punta y una profunda pasión por el bienestar animal. Creemos que cada mascota merece el mejor cuidado
                veterinario posible.
              </p>
              <p className="text-lg text-foreground/70">
                Nos comprometemos a proporcionar servicios veterinarios integrales, desde consultas preventivas hasta
                procedimientos quirúrgicos complejos, siempre priorizando la salud y el confort de tu mascota.
              </p>
            </div>

            {/* Values */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <Card className="bg-card border-border">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-primary mb-2">Excelencia</h3>
                  <p className="text-foreground/70">
                    Nos comprometemos con la máxima calidad en atención veterinaria y servicio al cliente.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-primary mb-2">Compromiso</h3>
                  <p className="text-foreground/70">
                    Dedicamos nuestra pasión al bienestar integral de cada animal que atiende nuestra clínica.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-primary mb-2">Innovación</h3>
                  <p className="text-foreground/70">
                    Utilizamos tecnología y técnicas veterinarias actualizadas para mejores resultados.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Nuestro Equipo Profesional</h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Conoce a los veterinarios especializados que cuidan de tu mascota
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="border-border overflow-hidden bg-background hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-1">{member.role}</p>
                    <p className="text-sm text-foreground/60 mb-4">{member.specialty}</p>
                    <p className="text-sm text-foreground/70">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
