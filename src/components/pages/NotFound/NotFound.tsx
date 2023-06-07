import React, { FC } from "react"
import NotFoundBlock from "../../NotFoundBlock"
import s from "./NotFound.module.scss"

const NotFound: FC = () => {
  return (
    <div className={s.container}>
      <NotFoundBlock />
    </div>
  )
}

export default NotFound
