export type CartItem = {
  id: number
  name: string
  price: number
  thumbnail?: string | null
  categoryName?: string | null
  quantity: number
}

export type CustomerData = {
  name: string
  email: string
  phone: string
  notes?: string
}
