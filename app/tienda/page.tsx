import TiendaClient from "./TiendaClient"
import { getCategories, getProducts } from "@/lib/api"
import type { ProductsPage } from "@/types/shop"

export default async function ProductosPage() {
  let categories: string[] = []
  let initialProducts: ProductsPage = { data: [], totalCount: 0 }
  let initialError: string | null = null

  try {
    // en paralelo (más rápido)
    const [cats, prods] = await Promise.all([
      getCategories(),
      getProducts({ page: 1, size: 12 }),
    ])

    categories = cats ?? []
    initialProducts = prods ?? { data: [], totalCount: 0 }
  } catch (e: any) {
    // Importante: NO romper render del server component
    initialError =
      e?.message?.toString?.() ??
      "No se pudo cargar la tienda. Verificá el backend y la configuración."
  }

  return (
    <TiendaClient
      categories={categories}
      initialProducts={initialProducts}
      initialError={initialError}
    />
  )
}
