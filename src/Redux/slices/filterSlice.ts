import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store/store"

export enum SortEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
}

export type TSort = {
  name: string
  sort: SortEnum
}

export interface IFilterSliceState {
  order: string
  searchValue: string
  categoryId: number
  currentPage: number
  sortType: TSort
}

const initialState: IFilterSliceState = {
  order: "",
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sortType: {
    name: "популярности (по убыванию)",
    sort: SortEnum.RATING_DESC,
  },
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setSortType(state, action: PayloadAction<TSort>) {
      state.sortType = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<IFilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage)
        state.sortType = action.payload.sortType
        state.categoryId = Number(action.payload.categoryId)
      } else {
        state.currentPage = 1
        state.categoryId = 0
        state.sortType = {
          name: "популярности",
          sort: SortEnum.RATING_DESC,
        }
      }
    },
  },
})

export const sortSelector = (state: RootState) => state.filter.sortType
export const filterSelector = (state: RootState) => state.filter

export const {
  setSortType,
  setCategoryId,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions

export default filterSlice.reducer
