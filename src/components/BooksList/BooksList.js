import BookDetails from "./BookDetails/BookDetails";
import styles from './BookList.module.scss';
import Spinner from '../UI/Spinner/Spinner';
import React from "react";

const BooksList = React.memo((props) => {

    let bookElement = (
        props.books.map(book => {
            return <BookDetails
                key={book.id}
                book={book}
                showModalFrom={props.showModalFrom}
            />
        })
    );

    return (
        <div className={styles.BooksList}>
            <div className={styles.Container}>
                {bookElement}
            </div>
            <div className={styles.Spinner}>
                {props.isLoading ? <Spinner width='50px' height='50px' /> : null}
            </div>
        </div>
    );
});

export default BooksList;