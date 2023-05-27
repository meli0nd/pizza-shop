import React, { useContext, useEffect, useState } from "react"
import Categories from "../Categories"
import Sort from "../Sort"
import PizzaItem from "../PizzaItem"
import ItemLoader from "../../common/ItemLoader"
import Pagination from "../pagination/Pagination"
import { AppContext } from "../../App"

const Home = () => {
  const { searchValue } = useContext(AppContext)
  const [pizzaItems, setPizzaItems] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [categoryId, setCategoryId] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortType, setSortType] = useState({
    name: "популярности (по убыванию)",
    sort: "rating",
  })
  const pizzaFiltered = pizzaItems.map((item) => {
    return <PizzaItem {...item} key={item.id} />
  })

  const skeleton = [...new Array(8)].map((item, index) => (
    <ItemLoader key={index} />
  ))

  useEffect(() => {
    setIsFetching(true)

    const order = sortType.sort.includes("-") ? "asc" : "desc"
    const sortBy = sortType.sort.replace("-", "")

    const category = categoryId > 0 ? `category=${categoryId}` : ""
    const search = searchValue ? `search=${searchValue}` : ""

    // MOCKApi doesn't work, so when you try to get data with 2 parameters at the same time, for example category and search, it will only give you a category.
    fetch(
      `https://647049e63de51400f7240675.mockapi.io/items?page=${currentPage}&limit=${4}&sortBy=${sortBy}&order=${order}&${search}`
    )
      //
      .then((res) => res.json())
      .then((result) => {
        setPizzaItems(result)
        setIsFetching(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortType, searchValue, currentPage])
  return (
    <>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          setCategoryId={(index) => setCategoryId(index)}
        />
        <Sort sortType={sortType} setSortType={(type) => setSortType(type)} />
      </div>
      <h2 className="content__title">🍕Все пиццы</h2>
      <div className="content__items">
        {isFetching ? skeleton : pizzaFiltered}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </>
  )
}

export default Home
