import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getCategories, getProducts } from "@/lib/api"
import TiendaClient from "./TiendaClient"

export default async function ProductosPage() {
  const categories = await getCategories()
  const initialProducts = await getProducts({ page: 1, size: 12 })

  return (
    <>
      <Header />
      <TiendaClient
        categories={categories}
        initialProducts={initialProducts}
      />
      <Footer />
    </>
  )
}
