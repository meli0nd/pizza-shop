import { FC } from "react"

const PageLoading: FC = () => {
  return (
    <div className="wrapper">
      <div className="content">
        <div className="container container--cart">
          <div className="cart cart--empty">
            <h2>Загрузка...</h2>
            <p>Пожалуйста, подождите</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageLoading
