import React, { useEffect, useState } from "react"

const Categories = () => {
  const [active, setActive] = useState(0)

  const onClickCategory = (index) => setActive(index)

  useEffect(() => {}, [active])

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ]

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              className={active === index ? "active" : ""}
              onClick={() => onClickCategory(index)}
              key={index}
            >
              {item}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Categories
