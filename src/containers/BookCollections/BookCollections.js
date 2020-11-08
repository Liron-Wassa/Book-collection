import DeleteCollection from '../../components/CollectionForms/DeleteCollection/DeleteCollection';
import EditCollection from '../../components/CollectionForms/EditCollection/EditCollection';
import Collections from '../../components/Collections/Collections';
import Modal from '../../components/UI/Modal/Modal';
import React, { useState } from 'react';

const BookCollections = () => {
  
  const [collectionName, setCollectionName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState(null);

  let formElement = (
    <EditCollection
      clicked={() => setShowModal(false)}
      collectionName={collectionName}
    />
  );

  if(formType === 'DELETE') {
    formElement = (
      <DeleteCollection
        clicked={() => setShowModal(false)}
        collectionName={collectionName}
      />
    );
  };

  return (
    <React.Fragment>
      <Modal
        clicked={() => setShowModal(false)}
        show={showModal}
      >
        {formElement}
      </Modal>
      <Collections
        setFormType={setFormType}
        clicked={() => setShowModal(true)}
        changeInput={setCollectionName}
      />
    </React.Fragment>
  );
};

export default BookCollections;