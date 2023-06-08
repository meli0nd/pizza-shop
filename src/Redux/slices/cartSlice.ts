import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store/store"

interface ICartSliceState {
  items: TCartItem[]
  totalPrice: number
}

export type TCartItem = {
  id: string
  imageUrl: string
  title: string
  types: string
  sizes: number
  price: number
  count: number
}

const initialState: ICartSliceState = {
  items: [],
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<TCartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)

      if (findItem) {
        findItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload)

      if (findItem) {
        findItem.count--
      }
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.items.filter((obj) => obj.id !== action.payload)
    },
    clearProducts(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const cartSelector = (state: RootState) => state.cart
export const cartItemByIdSelector = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id)

export const { addProduct, removeProduct, clearProducts, minusItem } =
  cartSlice.actions

export default cartSlice.reducer
