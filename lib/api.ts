import type { ProductsPage } from "@/types/shop"

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

if (!SERVER_URL) {
    throw new Error("NEXT_PUBLIC_SERVER_URL no está definida")
}

async function parseJsonSafe<T>(res: Response): Promise<T> {
    const text = await res.text()

    if (!res.ok) {
        throw new Error(`API ${res.status}: ${text}`)
    }

    try {
        return JSON.parse(text) as T
    } catch {
        throw new Error(`Respuesta no es JSON válido: ${text}`)
    }
}

export async function getCategories(): Promise<string[]> {
    const res = await fetch(
        `${SERVER_URL}/api/v1/category/public/getCategoriesNamesForWeb`,
        { cache: "no-store" }
    )
    return parseJsonSafe<string[]>(res)
}

export async function getProducts({
    page,
    size,
}: {
    page: number
    size: number
}): Promise<ProductsPage> {
    const res = await fetch(
        `${SERVER_URL}/api/v1/products/public/getProductsPaginated?page=${page}&size=${size}`,
        { cache: "no-store" }
    )
    return parseJsonSafe<ProductsPage>(res)
}

export async function getProductsByCategory({
    category,
    page,
    size,
}: {
    category: string
    page: number
    size: number
}): Promise<ProductsPage> {
    const res = await fetch(
        `${SERVER_URL}/api/v1/products/public/getByCategoryForWeb?categoryName=${category}&page=${page}&size=${size}`,
        { cache: "no-store" }
    )
    return parseJsonSafe<ProductsPage>(res)
}

export async function searchProducts(term: string) {
    const res = await fetch(
        `${SERVER_URL}/api/v1/products/public/searchProduct?searchTerm=${term}`,
        { cache: "no-store" }
    )
    return parseJsonSafe<any[]>(res)
}
