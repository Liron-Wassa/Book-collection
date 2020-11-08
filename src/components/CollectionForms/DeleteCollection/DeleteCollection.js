import { deleteCollection } from '../../../store/actions';
import styles from './DeleteCollection.module.scss';
import Button from '../../UI/Button/Button';
import { useDispatch } from 'react-redux';
import React from 'react';

const DeleteCollection = (props) => {

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(deleteCollection(props.collectionName));
    };


    return (
        <form className={styles.DeleteCollection} onSubmit={handleSubmit}>
            <h3 className={styles.Header}>Delete collection</h3>
            <p>Are you sure you want to delete your collection?</p>
            <div className={styles.Btn}>
                <Button type='Danger' clicked={() => props.clicked(false)}>Delete</Button>
            </div>
        </form>
    );
};

export default DeleteCollection;