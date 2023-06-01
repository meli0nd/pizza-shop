import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzas",
  async (params, thunkAPI) => {
    const { order, sortBy, category, search, currentPage } = params
    const { data } = await axios.get(
      `https://647049e63de51400f7240675.mockapi.io/items?page=${currentPage}&limit=${4}&sortBy=${sortBy}&${category}&order=${order}&${search}`
    )

    return data
  }
)

const initialState = {
  items: [],
  isFetching: "loading",
}

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.isFetching = "loadig"
      state.items = []
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.isFetching = "success"
      state.items = action.payload
    },
    [fetchPizzas.rejected]: (state) => {
      state.isFetching = "error"
      state.items = []
    },
  },
})

export const pizzaSelector = (state) => state.pizza

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
