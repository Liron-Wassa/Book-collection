import CollectionBookDetails from '../CollectionDetails/CollectionBookDetails/CollectionBookDetails';
import usePagination from '../../../hooks/usePagination';
import Pagination from '../../UI/Pagination/Pagination';
import styles from './CollectionDetails.module.scss';
import React from 'react';

const CollectionDetails = (props) => {

    const [currentPage, setPage] = usePagination(1);
    const booksPerPage = 2;

    const getPartialBooks = (books) => {
        const indexOfLastBook = currentPage * booksPerPage;
        const indexOfFirstBook = indexOfLastBook - booksPerPage;
        const partialBooks = books.slice(indexOfFirstBook, indexOfLastBook);
        return partialBooks;
    };

    const currentBooks = getPartialBooks(props.collection);

    const collectionBookDetailsElement = currentBooks.map(book => {
        return (
            <CollectionBookDetails
                key={book.id}
                book={book}
                collectionName={props.collectionName}
            />
        );
    });

    return (
        <div className={styles.CollectionDetails}>
            <div className={styles.Header}>
                <h1>{props.collectionName}</h1>
                <div className={styles.Icons}>
                    <i className="fas fa-edit" onClick={() => {
                        props.clicked();
                        props.setFormType('EDIT');
                        props.changeInput(props.collectionName);
                    }}/>
                    <i className="fas fa-trash-alt" onClick={() => {
                        props.clicked();
                        props.setFormType('DELETE');
                        props.changeInput(props.collectionName);
                    }}/>
                </div>    
            </div>
            <div className={styles.Container}>
                {collectionBookDetailsElement}
            </div>
            <Pagination
                totalBooks={props.collection.length}
                booksPerPage={booksPerPage}
                currentPage={currentPage}
                setPage={setPage}
            />
        </div>
    );
};

export default CollectionDetails;