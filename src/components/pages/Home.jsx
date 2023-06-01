import React, { useContext, useEffect, useRef } from "react"
import qs from "qs"
import Categories from "../Categories"
import Sort, { sortList } from "../Sort"
import PizzaItem from "../PizzaItem"
import ItemLoader from "../../common/ItemLoader"
import Pagination from "../pagination/Pagination"
import { AppContext } from "../../App"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  filterSelector,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../../Redux/slices/filterSlice"

import { fetchPizzas, pizzaSelector } from '../../Redux/slices/pizzasSlice'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)
  const { categoryId, sortType, currentPage, searchValue } = useSelector(filterSelector)
  const { items, isFetching } = useSelector(pizzaSelector)

  const getPizzas = async () => {
    window.scrollTo(0, 0)

    const order = sort.includes("-") ? "asc" : "desc"
    const sortBy = sort.replace("-", "")
    const category = categoryId > 0 ? `category=${categoryId}` : ""
    const search = searchValue ? `search=${searchValue}` : ""

    dispatch(fetchPizzas({ order, sortBy, category, search, currentPage }))
  }

  const sort = sortType.sort

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id))
  }
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  const pizzaFiltered = items.map((item) => {
    return <PizzaItem {...item} key={item.id} />
  })

  const skeleton = [...new Array(4)].map((item, index) => (
    <ItemLoader key={index} />
  ))

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort,
        categoryId,
        currentPage,
      })
      navigate(`?${queryString}`)
    }

    isMounted.current = true
  }, [categoryId, sort, currentPage])

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = sortList.find((obj) => obj.sort === params.sort)

      dispatch(setFilters({ ...params, sort }))
      isSearch.current = true
    }
  }, [])

  useEffect(() => {
    getPizzas()
  }, [categoryId, sort, searchValue, currentPage])

  console.log(pizzaFiltered.length)

  return (
    <>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={(index) => onClickCategory(index)}
        />
        <Sort />
      </div>
      <h2 className="content__title">🍕Все пиццы</h2>
      <div className="content__items">
        {isFetching === 'error' ? <div class="cart cart--empty">
          <div class="wrapper">
            <div class="content">
              <div class="container container--cart">
                <h2>Не удалось отправить запрос на сервер <icon>😕</icon></h2>
                <p>
                  Попробуйте перезагрузить страницу<br />
                </p>
              </div>
            </div>
          </div>
        </div>
          : isFetching === 'loading' ? skeleton : pizzaFiltered}
      </div>
      <Pagination
        value={currentPage}
        onChangePage={(number) => onChangePage(number)}
      />
    </>
  )
}

export default Home
