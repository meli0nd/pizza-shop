import React, { FC } from "react"
import ReactPaginate from "react-paginate"
import styles from "../pagination/Pagination.module.scss"

type TPaginationProps = {
  onChangePage: (n: number) => void
  currentPage: number
}

const Pagination: FC<TPaginationProps> = ({ onChangePage, currentPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(number) => onChangePage(number.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage}
      previousLabel="<"
    />
  )
}

export default Pagination
