import { moveBookFromCollection, deleteBookFromCollection } from '../../../../store/actions';
import styles from './CollectionBookDetails.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';

const CollectionBookDetails = (props) => {

    const [showMenu, setShowMenu] = useState(false);

    const dispatch = useDispatch();
    const collections = useSelector(state => state.collections);

    const bookImageUrl = `http://covers.openlibrary.org/b/olid/${props.book.cover_edition_key}-L.jpg`;
    const defaultImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQU_rAbzImKoUe99nwANLUxxY3N6S3s9o7CIw&usqp=CAU';

    let itemElements = collections.filter(collection => {
        return collection.name !== props.collectionName;
    }).map(collection => {
        return <span
            key={collection.name}
            onClick={() => dispatch(moveBookFromCollection(props.collectionName, collection.name, props.book))}
        >{collection.name}</span>
    });

    let menuItemElements = (
        <React.Fragment>
            <span className={styles.Header}>Move to collection</span>
            <hr />
            <div className={styles.Items}>
                {itemElements}
            </div>
            <hr />
        </React.Fragment>
    );

    if(!itemElements.length) {
        menuItemElements = null;
    };
    
    return (
        <div className={styles.CollectionBookDetails}>
            {showMenu ?
                <div className={styles.Menu}>
                    <span
                        onClick={() => setShowMenu(false)}
                        className={styles.Exit}
                    >X</span>
                    {menuItemElements}
                    <div className={styles.RemoveBox}>
                        <span
                            onClick={() => dispatch(deleteBookFromCollection(props.collectionName, props.book.id))}
                        >Remove from collection</span>
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

export default CollectionBookDetails;