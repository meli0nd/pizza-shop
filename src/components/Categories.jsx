import React, { useEffect, useState } from "react"

const Categories = ({ categoryId, setCategoryId }) => {
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
              onClick={() => setCategoryId(index)}
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
