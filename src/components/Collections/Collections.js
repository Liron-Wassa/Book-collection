import CollectionDetails from './CollectionDetails/CollectionDetails';
import styles from './Collections.module.scss';
import { useSelector } from 'react-redux';
import React from 'react';

const Collections = (props) => {

    const collections = useSelector(state => state.collections);

    let collectionsElements = <h1>You have no collections</h1>;

    if(collections.length) {
        collectionsElements = collections.map(collection => {
            return (
                <CollectionDetails
                    key={collection.name}
                    clicked={props.clicked}
                    collection={collection.books}
                    setFormType={props.setFormType}
                    collectionName={collection.name}
                    changeInput={props.changeInput}
                />
            );
        });
    };

    return (
        <div className={styles.Collections}>
            {collectionsElements}
        </div>
    );
};

export default Collections;