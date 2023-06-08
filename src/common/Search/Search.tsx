import React, { useCallback, useEffect, useRef, useState } from "react"
import s from "./Search.module.scss"
import debounce from "lodash.debounce"
import { useDispatch } from "react-redux"
import { setSearchValue } from "../../Redux/slices/filterSlice"

const Search = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState("")
  const searchInput = useRef<HTMLInputElement>(null)

  const onClickClear = () => {
    setValue("")
    searchInput.current?.focus()
    dispatch(setSearchValue(""))
  }

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str))
    }, 500),
    []
  )

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  useEffect(() => {})

  return (
    <div className={s.container}>
      <svg
        className={s.icon}
        enableBackground="new 0 0 50 50"
        height="50px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 50 50"
        width="50px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect fill="none" height="50" width="50" />
        <circle
          cx="21"
          cy="20"
          fill="none"
          r="16"
          stroke="#000000"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          stroke="#000000"
          strokeMiterlimit="10"
          strokeWidth="4"
          x1="32.229"
          x2="45.5"
          y1="32.229"
          y2="45.5"
        />
      </svg>
      <input
        ref={searchInput}
        value={value}
        onChange={onChangeInput}
        className={s.input}
        placeholder="Поиск пиццы..."
        type="text"
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={s.close}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  )
}

export default Search
