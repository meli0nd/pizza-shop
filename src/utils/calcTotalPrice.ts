import { TCartItem } from "../Redux/slices/cartSlice"

export const calcTotalPrice = (items: TCartItem[]) => {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum
  }, 0)
}
