import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Maximiliano Rios",
    pet: "Ragnar (Dogo Argentino)",
    text: "Me encanta llevar mis perros a esa vete por qué tienen un cariño y una dedicación única",
    rating: 5,
  },
  {
    name: "Mayra Mayer",
    pet: "Cloe (Bulldog Francés)",
    text: "Excelente el sistema de recordatorios de vacunas (que en lo personal en otra veterinaria no me a pasado) , súper honestos sinceros y claros con los diagnósticos ! Me generaron mucha confianza . Los elijo y recomiendo siempre 🙌🏼",
    rating: 5,
  },
  {
    name: "Lucia Arce",
    pet: "Cuqui (Gato)",
    text: "Muy buena atención, limpias instalaciones y super atento el doctor. Variedad de alimentos, medicación y accesorios.",
    rating: 4,
  },
  {
    name: "Andrea Noemi Avila",
    pet: "",
    text: "Excelente atención a las mascotas, el personal es muy profesional, muy recomendable.",
    rating: 5,
  },
  {
    name: "Elsa Quiroga",
    pet: "Azul (Gato)",
    text: "Muy buena atención Muy responsables Mis tres bebés son pacientes de Andrés.",
    rating: 4,
  },
  {
    name: "Hernan Villegas",
    pet: "",
    text: "Excelente atencion. 100% recomendable . Cuentan con veterinario y tambien alimentos y acsesorios para perros.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Lo Que Dicen Nuestros Clientes</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            La confianza de nuestros clientes es nuestro mayor logro
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-card-foreground/80 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-card-foreground">{testimonial.name}</p>
                  <p className="text-sm text-card-foreground/60">{testimonial.pet}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
