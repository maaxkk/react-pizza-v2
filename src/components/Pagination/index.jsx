import React from 'react';
import ReactPaginate from "react-paginate";

import styles from './Pagination.module.scss'

function Pagination({value, onChangePage}) {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={event => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
            forcePage={value - 1}
            renderOnZeroPageCount={null}
        />
    );
}

export default Pagination;