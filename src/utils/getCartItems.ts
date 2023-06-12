import { calcTotalPrice } from "./calcTotalPrice"

export const getCartItems = () => {
  const json = localStorage.getItem("cartItems")
  const items = json ? JSON.parse(json) : []
  const totalPrice = calcTotalPrice(items)

  return {
    items,
    totalPrice,
  }
}
