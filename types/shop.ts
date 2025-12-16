export interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  categoryName: string
  providerName: string
  thumbnail?: string
}

export interface ProductDto {
  id: number
  name: string
  description: string
  barCode: number | null
  cost: number | null
  price: number
  stock: number
  categoryName: string
  providerName: string | null
  stockAlert: boolean
  published: boolean
  image?: string | null
  thumbnail?: string | null
}

export type CategoryName = string
export type Categories = CategoryName[]

export interface PageResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
  size: number
  first?: boolean
  last?: boolean
}

export interface ProductsPage {
  data: ProductDto[]
  totalCount: number
}

export interface ProductsResponse {
  data: ProductDto[]
  totalCount: number
}