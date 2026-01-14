import { notFound } from "next/navigation"
import { Calendar, Heart, Pill, PawPrint, Syringe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchJson } from "@/lib/api"

const PUBLIC_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://veterinariadelparque.com.ar"

interface Pet {
  id: number
  publicId: string | null
  name: string
  race: string
  gender: string
  species: string
  weight: number
  born: string
  photo: string | null
  thumbnail: string | null
  ownerName: string
  ownerPhone: string
  medicalHistory: null
}

interface MedicalHistory {
  id: number
  date: string
  type: string
  notes: string
  description: string
  medicine: string
  petId: null
  file: string | null
}

interface Vaccine {
  id: number
  date: string
  name: string
  notes: string
  petId: number
}

interface PetData {
  pet: Pet
  medicalHistory: MedicalHistory[]
  vaccine: Vaccine[]
}

function buildPublicDownloadUrl(filePath: string) {
  // filePath viene tipo "/otp/fileStorage/....pdf"
  return `${PUBLIC_ORIGIN}/api/v1/public/files/download?path=${encodeURIComponent(filePath)}`
}

async function getPetData(petId: string): Promise<PetData | null> {
  try {
    return await fetchJson<PetData>(`/api/v1/public/pet?publicId=${encodeURIComponent(petId)}`, { cache: "no-store" })
  } catch (error) {
    console.error("Error fetching pet data:", error)
    return null
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function calculateAge(birthDate: string): string {
  const birth = new Date(birthDate)
  const today = new Date()
  const years = today.getFullYear() - birth.getFullYear()
  const months = today.getMonth() - birth.getMonth()

  if (years === 0) {
    return `${months} ${months === 1 ? "mes" : "meses"}`
  } else if (months < 0) {
    return `${years - 1} ${years - 1 === 1 ? "año" : "años"} y ${12 + months} meses`
  } else if (months === 0) {
    return `${years} ${years === 1 ? "año" : "años"}`
  } else {
    return `${years} ${years === 1 ? "año" : "años"} y ${months} ${months === 1 ? "mes" : "meses"}`
  }
}

export default async function PetProfilePage({
  params,
}: {
  params: { petId: string }
}) {
  const data = await getPetData(params.petId)
  if (!data) {
    notFound()
  }

  const { pet, medicalHistory, vaccine } = data

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background py-22">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Pet Header Card */}
        <Card className="mb-8 overflow-hidden border-2">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Pet Photo */}
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
                {pet.thumbnail ? (
                  <img
                    src={`data:image/jpeg;base64,${pet.thumbnail}`}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <PawPrint className="w-24 h-24 text-white" />
                  </div>
                )}
              </div>

              {/* Pet Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-foreground mb-2">{pet.name}</h1>
                <p className="text-xl text-muted-foreground mb-4">Mascota de {pet.ownerName}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-white/80 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Especie</p>
                    <p className="font-semibold text-foreground capitalize">{pet.species}</p>
                  </div>
                  <div className="bg-white/80 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Raza</p>
                    <p className="font-semibold text-foreground">{pet.race}</p>
                  </div>
                  <div className="bg-white/80 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Sexo</p>
                    <p className="font-semibold text-foreground capitalize">{pet.gender}</p>
                  </div>
                  <div className="bg-white/80 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Peso</p>
                    <p className="font-semibold text-foreground">{pet.weight} kg</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                  <Badge variant="secondary" className="text-sm px-4 py-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    Nació: {formatDate(pet.born)}
                  </Badge>
                  <Badge variant="outline" className="text-sm px-4 py-2">
                    <Heart className="w-4 h-4 mr-2" />
                    Edad: {calculateAge(pet.born)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Medical History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Pill className="w-6 h-6 text-primary" />
                Historial Médico
              </CardTitle>
            </CardHeader>
            <CardContent>
              {medicalHistory && medicalHistory.length > 0 ? (
                <div className="space-y-4">
                  {medicalHistory.map((record) => (
                    <div
                      key={record.id}
                      className="border-l-4 border-primary/50 pl-4 py-2 hover:border-primary transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary">{record.type}</Badge>
                        <span className="text-sm text-muted-foreground">{formatDate(record.date)}</span>
                      </div>
                      <h4 className="font-semibold text-foreground mb-1">{record.description}</h4>
                      {record.medicine && (
                        <p className="text-sm text-muted-foreground mb-1">
                          <span className="font-medium">Medicamento:</span> {record.medicine}
                        </p>
                      )}
                      {record.notes && <p className="text-sm text-muted-foreground">{record.notes}</p>}
                      {record.file && record.file.trim() !== "" && (
                        <div className="mt-3">
                          <a
                            href={`/api/v1/public/pet/${pet.publicId}/medical-history/${record.id}/file`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Descargar archivo
                          </a>
                          <p className="text-xs text-muted-foreground mt-1">
                            Se abrirá/descargará en una pestaña nueva.
                          </p>
                        </div>
                      )
                      }
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No hay registros médicos disponibles</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Syringe className="w-6 h-6 text-secondary" />
                Vacunas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {vaccine && vaccine.length > 0 ? (
                <div className="space-y-4">
                  {vaccine.map((vac) => (
                    <div
                      key={vac.id}
                      className="border-l-4 border-secondary/50 pl-4 py-2 hover:border-secondary transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{vac.name}</h4>
                        <span className="text-sm text-muted-foreground">{formatDate(vac.date)}</span>
                      </div>
                      {vac.notes && <p className="text-sm text-muted-foreground">{vac.notes}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No hay vacunas registradas</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
