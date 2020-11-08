import { useState } from 'react';

const usePagination = (initialPage) => {

    const [currentPage, setCurrentPage] = useState(initialPage);

    const setPage = (pageNumber, pageLength) => {
        if(pageNumber && (pageNumber <= pageLength)) {
            setCurrentPage(pageNumber);
        };
    };

    return [currentPage, setPage];
};

export default usePagination;