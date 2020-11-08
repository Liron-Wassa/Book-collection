import NewCollection from "../../components/CollectionForms/NewCollection/NewCollection";
import SearchBarBooks from "../../components/SearchBarBooks/SearchBarBooks";
import React, { useState, useCallback, useEffect } from "react";
import { fetchBooks, abortFetchBooks } from '../../api/book';
import BooksList from '../../components/BooksList/BooksList';
import Modal from '../../components/UI/Modal/Modal';

const BookSearch = (props) => {
  
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPages, setMaxPages] = useState(0);
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    const onScrollHandler = (event) => {
      const { scrollY, innerHeight } = event.currentTarget;
      const endHeightPage = document.documentElement.offsetHeight - innerHeight;
      const scrollReachedToEnd = endHeightPage === scrollY;
      if(scrollReachedToEnd && !isLoading) {
        setPageNumber(pageNumber => pageNumber + 1);
      };
    };
    window.addEventListener('scroll', onScrollHandler);
    return () => {
      window.removeEventListener('scroll', onScrollHandler);
      abortFetchBooks();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(error) {
      abortFetchBooks();
    };
  }, [error]);

  useEffect(() => {
    const notReachedToEnd = books.length < maxPages;
    const isGreaterThanStartPoint = pageNumber > 1;
    if(isGreaterThanStartPoint && notReachedToEnd && !isLoading) {
      const params = new URLSearchParams(props.history.location.search);
      const values = params.values();
      for (const term of values) {
        onFetchBooksHandler(term, pageNumber);
      };
    };
    // eslint-disable-next-line
  }, [pageNumber]);

  const onFetchBooksHandler = async (term, pageNumber) => {
    setIsLoading(true);
    setError('');
    try {
      const { bookLists, maxPages } = await fetchBooks(term, pageNumber);
      const sortedBooks = sortBooksByYear(bookLists);
      const booksWithId = addForEachBookId(sortedBooks);
      setIsLoading(false);
      setBooks((books) => [...books, ...booksWithId]);
      setMaxPages(maxPages);
    } catch(error) {
      if(error.name === 'AbortError') return;
      const message = 'Something went wrong';
      setIsLoading(false);
      setShowModal(true);
      setError(message);
      setBooks([]);
    };
  };

  const searchBooks = (event, term) => {
    event.preventDefault();
    if(!isLoading) {
      const pageNumber = 1;
      props.history.push({
        search: `?query=${term}`
      });
      setPageNumber(1);
      setMaxPages(0);
      setBooks([]);
      onFetchBooksHandler(term, pageNumber);
    };
  };

  const sortBooksByYear = (books) => {
    const tempBooks = [...books];
    const result = tempBooks.sort((firstBook, secondBook) => {
      return secondBook.first_publish_year - firstBook.first_publish_year;
    });
    return result;
  };
    
  const addForEachBookId = (books) => {
    const tempBooks = [...books];
    tempBooks.forEach(book => {
      book.id = book.key;
    });
    return tempBooks;
  };

  const showModalFromHandler = useCallback((book) => {
    setShowModal(true);
    setBook(book);
  }, []);

  return (
    <React.Fragment>
      <Modal clicked={() => setShowModal(false)} show={showModal}>
        {error ? <h3>{error}</h3> :
          <NewCollection
            book={book}
            clicked={() => setShowModal(false)}
          />} 
      </Modal>
      <SearchBarBooks
        searchBooks={searchBooks}
      />
      <BooksList
        showModalFrom={showModalFromHandler}
        isLoading={isLoading}
        books={books}
      />
    </React.Fragment>
  );
};

export default BookSearch;