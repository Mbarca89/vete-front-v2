"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

const products = [
  {
    id: 1,
    name: "Alimento Premium Perros Adultos",
    category: "Alimento",
    price: "$45.99",
    image: "/dog-food-premium.jpg",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Juguete Interactivo de Goma",
    category: "Juguetes",
    price: "$12.99",
    image: "/interactive-rubber-toy.jpg",
    rating: 4.6,
    reviews: 89,
  },
  {
    id: 3,
    name: "Collar Antiparasitario",
    category: "Antiparasitario",
    price: "$28.50",
    image: "/antiparasitic-collar.jpg",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: "Champú Medicado para Gatos",
    category: "Higiene",
    price: "$18.99",
    image: "/cat-medicated-shampoo.jpg",
    rating: 4.5,
    reviews: 67,
  },
  {
    id: 5,
    name: "Comedero Elevado",
    category: "Accesorios",
    price: "$35.00",
    image: "/elevated-pet-feeder.jpg",
    rating: 4.9,
    reviews: 203,
  },
  {
    id: 6,
    name: "Cama Ortopédica para Perros",
    category: "Accesorios",
    price: "$89.99",
    image: "/orthopedic-dog-bed.jpg",
    rating: 4.8,
    reviews: 178,
  },
  {
    id: 7,
    name: "Suplemento Articular",
    category: "Suplementos",
    price: "$32.50",
    image: "/joint-supplement.jpg",
    rating: 4.7,
    reviews: 95,
  },
  {
    id: 8,
    name: "Cepillo de Dientes Mascota",
    category: "Higiene",
    price: "$14.99",
    image: "/pet-toothbrush.jpg",
    rating: 4.4,
    reviews: 52,
  },
  {
    id: 9,
    name: "Alimento Gatos Senioridad",
    category: "Alimento",
    price: "$38.50",
    image: "/senior-cat-food.jpg",
    rating: 4.6,
    reviews: 78,
  },
  {
    id: 10,
    name: "Golosinas de Entrenamiento",
    category: "Golosinas",
    price: "$9.99",
    image: "/training-treats.jpg",
    rating: 4.9,
    reviews: 241,
  },
  {
    id: 11,
    name: "Transportín Portátil",
    category: "Accesorios",
    price: "$65.00",
    image: "/portable-pet-carrier.jpg",
    rating: 4.7,
    reviews: 134,
  },
  {
    id: 12,
    name: "Vitaminas Multiples Mascotas",
    category: "Suplementos",
    price: "$24.99",
    image: "/pet-vitamins.jpg",
    rating: 4.5,
    reviews: 88,
  },
]

const categories = ["Alimento", "Juguetes", "Antiparasitario", "Higiene", "Accesorios", "Suplementos", "Golosinas"]

export default function Productos() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const filteredProducts =
    selectedCategories.length === 0 ? products : products.filter((p) => selectedCategories.includes(p.category))

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Productos Veterinarios</h1>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Todo lo que necesitas para el bienestar y cuidado de tu mascota
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="md:col-span-1">
                <div className="sticky top-24 bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-bold text-primary mb-4">Filtrar por Categoría</h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                          className="border-primary"
                        />
                        <label
                          htmlFor={category}
                          className="text-sm font-medium text-foreground cursor-pointer hover:text-primary transition-colors"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                  {selectedCategories.length > 0 && (
                    <button
                      onClick={() => setSelectedCategories([])}
                      className="mt-6 w-full px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
                    >
                      Limpiar filtros
                    </button>
                  )}
                </div>
              </div>

              {/* Products Grid */}
              <div className="md:col-span-3">
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-foreground/70">
                    Mostrando <span className="font-bold text-primary">{filteredProducts.length}</span> productos
                  </p>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <Card
                        key={product.id}
                        className="border-border hover:shadow-lg transition-shadow overflow-hidden bg-card"
                      >
                        <div className="relative aspect-square overflow-hidden bg-muted">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                            {product.category}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-foreground mb-2 line-clamp-2">{product.name}</h3>
                          <div className="flex items-center gap-1 mb-3">
                            <div className="flex text-yellow-400">{"★".repeat(Math.floor(product.rating))}</div>
                            <span className="text-sm text-foreground/60">({product.reviews})</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-primary">{product.price}</span>
                            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                              Comprar
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-foreground/70">No hay productos en esta categoría</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
