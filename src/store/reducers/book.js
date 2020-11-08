import { updateObject } from '../../utils/updateObject';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    collections: []
};

const addCollection = (state, payload) => {
    const { collectionName, book } = payload;
    const tempCollections = [...state.collections];
    const foundCollection = tempCollections.find(collection => collection.name === collectionName);

    if(collectionName.trim() && !foundCollection) {
        const collection = {name: collectionName, books: [book]};
        tempCollections.push(collection);
        const updatedProperties = {collections: tempCollections};
        return updateObject(state, updatedProperties);
    }
    else {
        const payload = {collectionName: collectionName, book: book};
        return addToCollection(state, payload);
    };
};

const editCollection = (state, payload) => {
    const { oldCollectionName, newCollectionName } = payload;
    const tempCollections = [...state.collections];
    const collectionIndex = tempCollections.findIndex(collection => collection.name === oldCollectionName);

    if(collectionIndex !== -1) {
        const tempCollection = {...tempCollections[collectionIndex]};
        tempCollection.name = newCollectionName;
        tempCollections[collectionIndex] = tempCollection;
    };
    const updatedProperties = {collections: tempCollections};
    return updateObject(state, updatedProperties);
};

const addToCollection = (state, payload) => {
    const { collectionName, book } = payload;
    const bookId = book.id;
    const tempCollections = [...state.collections];
    const collectionIndex = tempCollections.findIndex(collection => collection.name === collectionName);
    const tempCollection = {...tempCollections[collectionIndex]};
    const tempBooks = [...tempCollection.books];

    const foundBook = tempBooks.find(book => book.id === bookId);
    if(foundBook) {
        const newCollection = tempBooks.filter(book => book.id !== bookId);
        tempCollection.books = newCollection;
    }
    else {
        tempBooks.push(book);
        tempCollection.books = tempBooks;
    };
    tempCollections[collectionIndex] = tempCollection;
    const updatedProperties = {collections: tempCollections};
    return updateObject(state, updatedProperties);
};

const deleteCollection = (state, payload) => {
    const { collectionName } = payload;
    const tempCollections = [...state.collections];
    const collectionIndex = tempCollections.findIndex(collection => collection.name === collectionName);

    if(collectionIndex !== -1) {
        tempCollections.splice(collectionIndex, 1);
    };
    const updatedProperties = {collections: tempCollections};
    return updateObject(state, updatedProperties);
};

const deleteBookFromCollection = (state, payload) => {
    const { collectionName, id } = payload;
    const tempCollections = [...state.collections];
    const collectionIndex = tempCollections.findIndex(collection => collection.name === collectionName);

    if(collectionIndex !== -1) {
        const tempCollection = {...tempCollections[collectionIndex]};
        const tempBooks = [...tempCollection.books];
        const newBooks = tempBooks.filter(book => book.id !== id);
        tempCollection.books = newBooks;
        tempCollections[collectionIndex] = tempCollection;
    };
    const updatedProperties = {collections: tempCollections};
    return updateObject(state, updatedProperties);
};

const moveBookFromCollection = (state, payload) => {
    const { currentCollectionName, newCollectionName, book } = payload;
    const bookId = book.id;
    const deleteBookPayload = {collectionName: currentCollectionName, id: bookId};
    const tempState = deleteBookFromCollection(state, deleteBookPayload);
    const addBookPayload = {collectionName: newCollectionName, book: book};
    const newState = addToCollection(tempState, addBookPayload);
    return newState;
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_COLLECTION: {
            return addCollection(state, action.payload);
        }
        case actionTypes.EDIT_COLLECTION: {
            return editCollection(state, action.payload);
        }
        case actionTypes.ADD_TO_COLLECTION: {
            return addToCollection(state, action.payload);
        }
        case actionTypes.DELETE_COLLECTION: {
            return deleteCollection(state, action.payload);
        }
        case actionTypes.DELETE_BOOK_FROM_COLLECTION: {
            return deleteBookFromCollection(state, action.payload);
        }
        case actionTypes.MOVE_BOOK_FROM_COLLECTION: {
            return moveBookFromCollection(state, action.payload);
        }
        default: return state;
    };
};

export default reducer;