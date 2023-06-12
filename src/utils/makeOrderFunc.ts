import { TCartItem } from "../Redux/slices/cartSlice"

export const makeOrderFunc = (items: any) => {
  const json = JSON.stringify(items)
  const data = localStorage.setItem("order", json)
}
