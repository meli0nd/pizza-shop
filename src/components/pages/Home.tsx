import React, { useEffect, useRef, FC } from "react"
import qs from "qs"
import Categories from "../Categories"
import Sort, { sortList } from "../Sort"
import PizzaItem from "../PizzaItem"
import ItemLoader from "../../common/ItemLoader"
import Pagination from "../pagination/Pagination"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  filterSelector,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../../Redux/slices/filterSlice"

import { fetchPizzas, pizzaSelector } from "../../Redux/slices/pizzasSlice"

const Home: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)
  const { categoryId, sortType, currentPage, searchValue } =
    useSelector(filterSelector)
  const { items, isFetching } = useSelector(pizzaSelector)

  const getPizzas = async () => {
    window.scrollTo(0, 0)

    const order = sort.includes("-") ? "asc" : "desc"
    const sortBy = sort.replace("-", "")
    const category = categoryId > 0 ? `category=${categoryId}` : ""
    const search = searchValue ? `search=${searchValue}` : ""

    dispatch(
      // @ts-ignore   //will be fixed...
      fetchPizzas({ order, sortBy, category, search, currentPage })
    )
  }

  const sort = sortType.sort

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id))
  }
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const pizzaFiltered = items.map((item: any) => {
    return <PizzaItem {...item} />
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

  return (
    <>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={(index: number) => onClickCategory(index)}
        />
        <Sort />
      </div>
      <h2 className="content__title">🍕Все пиццы</h2>
      <div className="content__items">
        {isFetching === "error" ? (
          <div className="cart cart--empty">
            <div className="wrapper">
              <div className="content">
                <div className="container container--cart">
                  <h2>
                    Не удалось отправить запрос на сервер <span>😕</span>
                  </h2>
                  <p>
                    Попробуйте перезагрузить страницу
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : isFetching === "loading" ? (
          skeleton
        ) : (
          pizzaFiltered
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        onChangePage={(number: number) => onChangePage(number)}
      />
    </>
  )
}

export default Home