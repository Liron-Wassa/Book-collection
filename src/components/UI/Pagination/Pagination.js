import styles from './Pagination.module.scss';
import React, { useEffect } from 'react';

const Pagination = (props) => {

    const maxPaginationItems = 5;
    const pageLength = Math.ceil(props.totalBooks / props.booksPerPage);

    let maxLeft = (props.currentPage - Math.floor(maxPaginationItems / 2));
    let maxRight = (props.currentPage + Math.floor(maxPaginationItems / 2));
    
    if(maxLeft < 1) {
        maxLeft = 1;
        maxRight = maxPaginationItems;
    };

    if(maxRight > pageLength) {
        maxLeft = pageLength - (maxPaginationItems - 1);
        maxRight = pageLength;
        if(maxLeft < 1) {
            maxLeft = 1;
        };
    };

    const generatePaginationNumbers = () => {
        const result = [];
        for (let index = maxLeft; index <= maxRight; index++) {
            result.push(index);
        };
        return result;
    };

    const paginationNumbers = generatePaginationNumbers();

    useEffect(() => {
        if(props.currentPage > maxRight) {
            props.setPage(props.currentPage - 1, pageLength);
        };
    }, [maxRight, props, pageLength]);
    
    const paginationElements = paginationNumbers.map((pageNumber) => (
        <span
            key={pageNumber}
            onClick={() => props.setPage(pageNumber, pageLength)}
            className={props.currentPage === pageNumber ? styles.Active : null}
        >   
            {pageNumber}
        </span>
    ));

    return (
        paginationNumbers.length ?
            <div className={styles.Pagination}>
                <span onClick={() => props.setPage(props.currentPage - 1, pageLength)}>&laquo;</span>
                    {paginationElements}
                <span onClick={() => props.setPage(props.currentPage + 1, pageLength)}>&raquo;</span>
            </div>
        : null
    );
};

export default Pagination;