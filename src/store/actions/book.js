import * as actionTypes from './actionTypes';

export const addCollection = (collectionName, book) => {
    return {
        type: actionTypes.ADD_COLLECTION,
        payload: {
            collectionName: collectionName,
            book: book
        }
    };
};

export const editCollection = (oldCollectionName, newCollectionName) => {
    return {
        type: actionTypes.EDIT_COLLECTION,
        payload: {
            oldCollectionName: oldCollectionName,
            newCollectionName: newCollectionName
        }
    };
};

export const addToCollection = (collectionName, book) => {
    return {
        type: actionTypes.ADD_TO_COLLECTION,
        payload: {
            collectionName: collectionName,
            book: book
        }
    };
};

export const deleteCollection = (collectionName) => {
    return {
        type: actionTypes.DELETE_COLLECTION,
        payload: {
            collectionName: collectionName
        }
    };
};

export const deleteBookFromCollection = (collectionName, id) => {
    return {
        type: actionTypes.DELETE_BOOK_FROM_COLLECTION,
        payload: {
            collectionName: collectionName,
            id: id
        }
    };
};

export const moveBookFromCollection = (currentCollectionName, newCollectionName, book) => {
    return {
        type: actionTypes.MOVE_BOOK_FROM_COLLECTION,
        payload: {
            currentCollectionName: currentCollectionName,
            newCollectionName: newCollectionName,
            book: book
        }
    };
};