import { addToCollection } from '../../../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import styles from './BookDetails.module.scss';
import React, { useState } from 'react';

const BookDetails = (props) => {

  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();
  const collections = useSelector(state => state.collections);

  const bookImageUrl = `http://covers.openlibrary.org/b/olid/${props.book.cover_edition_key}-L.jpg`;
  const defaultImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQU_rAbzImKoUe99nwANLUxxY3N6S3s9o7CIw&usqp=CAU';

  let menuItemElements = 'You have no collections';

  if(collections.length) {
    menuItemElements = collections.map(collection => {
      const foundBookInCollection = collection.books.find(book => book.id === props.book.id);
      return <div
        key={collection.name}
        onClick={() => dispatch(addToCollection(collection.name, props.book))}
      >
        <span>{collection.name}</span>
        {foundBookInCollection ? <span className={styles.Active}>&#10003;</span> : null}
      </div>
    });
  };

  return (
    <div className={styles.Card}>
      {showMenu ?
        <div className={styles.Menu}>
          <span
            onClick={() => setShowMenu(false)}
            className={styles.Exit}>X</span>
          <span className={styles.Header}>Collections</span>
          <hr />
          <div className={styles.Items}>
            {menuItemElements}
          </div>
          <hr />
          <div className={styles.CreateBox}>
            <i className={["fas fa-plus", styles.Create].join(' ')}/>
            <span onClick={() => props.showModalFrom(props.book)}>Create New Collection</span>
          </div>
        </div>
      : null}
      <i
        onClick={() => setShowMenu(true)}
        className={["fas fa-ellipsis-v", styles.More].join(' ')}
      />
      <div className={styles.infoBox}>
        <span>{props.book.title}</span>
        <em>{props.book.publish_date ? `Published: ${props.book.publish_date[0]}` : 'Published: unknown'}</em>
      </div>
      <div className={styles.ImageBox}>
        <img src={props.book.cover_edition_key ? bookImageUrl : defaultImageUrl} alt='Book' />
      </div>
      <div className={styles.Box}>
        <p>Author: {props.book.author_name}</p>
      </div>
    </div>
  );
};

export default BookDetails;