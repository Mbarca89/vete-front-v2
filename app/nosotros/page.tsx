import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

const team = [
  {
    name: "Noelia Témoli",
    role: "Secretaria",
    specialty: "",
    image: "/noe.webp",
    bio: "Encargada de la atención al cliente y gestión administrativa de la clínica."
  },
  {
    name: "Andrés Témoli",
    role: "Veterinario principal",
    specialty: "MP: 396",
    image: "/andres.webp",
    bio: "Más de 15 años de experiencia en veterinaria, especializado en diagnóstico clínico y cirugía general."
  },
  {
    name: "Agustina Lerario",
    role: "Asistente de cirugía",
    specialty: "Post operatorios",
    image: "/agus.webp",
    bio: "Estudiante avanzado de Veterinaria, actualmente asistente de cirugía y encargada de post operatorios."
  },
  {
    name: "Franco Rodríguez",
    role: "Clínica General",
    specialty: "MP 689",
    image: "/franco.webp",
    bio: "Médico veterinario con más de 4 años de experiencia, especializado en anestesia."
  },
  {
    name: "Valentina Suárez",
    role: "Secretaria",
    specialty: "",
    image: "/valen.webp",
    bio: "Encargada de la atención al cliente y gestión administrativa de la clínica."
  },
]

export default function Nosotros() {
  return (
    <div className="min-h-screen">
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
                Desde el 2011 nos encargamos de mejorar la salud de los animales enfocados en brindar una atención compasiva, respeto y profesionalidad en cada consulta y tratamiento que realizamos. 
              </p>
              <p className="text-lg text-foreground/70 mb-4">
                En cada visita nos esforzamos por brindar la mejor atención y asesoramiento para que vuelvas a tu casa con la tranquilidad que tu mascota esta sana y bajo el cuidado de profesionales que se dedican a asegurar su bienestar.
              </p>
              <p className="text-lg text-foreground/70">
                Ante cualquier duda sobre algun malestar que pueda tener tu mascota, realizamos los estudios mas completos para descarcar cualquier patología presente o futura.
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
    </div>
  )
}
