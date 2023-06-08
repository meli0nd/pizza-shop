import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store/store"
import { TSort } from "./filterSlice"

type TPizzaItem = {
  id: string
  imageUrl: string
  title: string
  types: number[]
  sizes: number[]
  price: number
  category: number
  rating: string
}

export type TSearchPizzaParams = {
  order: string
  sortBy: string
  category: string
  search: string
  currentPage: string
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface IPizzaSliceState {
  items: TPizzaItem[]
  isFetching: "loading" | "success" | "error"
}

export const fetchPizzas = createAsyncThunk<TPizzaItem[], TSearchPizzaParams>(
  "pizza/fetchPizzas",
  async (params, thunkAPI) => {
    const { order, sortBy, category, search, currentPage } = params
    const { data } = await axios.get(
      `https://647049e63de51400f7240675.mockapi.io/items?page=${currentPage}&limit=${4}&sortBy=${sortBy}&${category}&order=${order}&${search}`
    )

    return data
  }
)

const initialState: IPizzaSliceState = {
  items: [],
  isFetching: Status.LOADING,
}

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TPizzaItem[]>) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.items = []
      state.isFetching = Status.LOADING
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.isFetching = Status.SUCCESS
    })
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.items = []
      state.isFetching = Status.ERROR
    })
  },
})

export const pizzaSelector = (state: RootState) => state.pizza

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
