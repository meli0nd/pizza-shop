import axios from "axios"
import { FC, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import s from "./PizzaInfo.module.scss"

const PizzaInfo: FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string
    title: string
    price: number
  }>({
    imageUrl: "",
    title: "",
    price: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    async function getPizza() {
      setIsLoading(true)
      try {
        const { data } = await axios.get(
          `https://647049e63de51400f7240675.mockapi.io/items/${id}`
        )
        setPizza(data)
      } catch (e) {
        alert("Произошла ошибка при запросе на сервер")
      } finally {
        setIsLoading(false)
      }
    }

    getPizza()
  }, [id])

  return (
    <>
      {isLoading ? (
        <div className={s.loadingContainer}>
          <h1>
            <b>LOADING...</b>
          </h1>
        </div>
      ) : (
        <div className={s.pizzaInfoContainer}>
          <h1>Название: Пицца {pizza.title}</h1>
          <h2>Цена: {pizza.price} руб. </h2>
          <img src={pizza.imageUrl} alt="" />
          <Link
            to={"/"}
            className="button button--outline button--add go-back-btn"
          >
            Вернутся назад
          </Link>
        </div>
      )}
    </>
  )
}

export default PizzaInfo
