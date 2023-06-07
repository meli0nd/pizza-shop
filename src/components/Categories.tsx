import React, { useEffect, FC } from "react"

type CategoriesProps = {
  categoryId: number
  onClickCategory: any
}

const Categories: FC<CategoriesProps> = ({ categoryId, onClickCategory }) => {
  useEffect(() => {}, [categoryId])

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
              className={categoryId === index ? "active" : ""}
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
