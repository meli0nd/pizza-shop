import React, { useEffect, useState } from "react"
import Categories from "../Categories"
import Sort from "../Sort"
import PizzaItem from "../PizzaItem"
import ItemLoader from "../../common/ItemLoader"

const Home = () => {
  const [pizzaItems, setPizzaItems] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  useEffect(() => {
    setIsFetching(true)

    fetch("https://647049e63de51400f7240675.mockapi.io/items")
      .then((res) => res.json())
      .then((result) => setPizzaItems(result))
    setIsFetching(false)
  }, [])
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isFetching
          ? [...new Array(8)].map((index) => <ItemLoader key={index} />)
          : pizzaItems.map((item) => {
              return <PizzaItem {...item} key={item.id} />
            })}
      </div>
    </>
  )
}

export default Home
