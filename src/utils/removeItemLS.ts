import { TCartItem } from "../Redux/slices/cartSlice"
import { getCartItems } from "./getCartItems"

export const removeItemLS = (LSkey: string, id: string) => {
  const data = getCartItems()
  const result = data.items.filter((obj: TCartItem) => {
    return obj.id !== id
  })
  localStorage.setItem(LSkey, JSON.stringify(result))
}
