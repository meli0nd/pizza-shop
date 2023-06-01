import React from "react"
import ReactPaginate from "react-paginate"
import styles from "../pagination/Pagination.module.scss"

const Pagination = ({ onChangePage, currentPage }) => {
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
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination
