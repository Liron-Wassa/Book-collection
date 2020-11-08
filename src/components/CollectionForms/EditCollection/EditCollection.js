import { checkValidity } from '../../../utils/checkValidity';
import { editCollection } from '../../../store/actions';
import React, { useState, useEffect } from 'react';
import styles from './EditCollection.module.scss';
import Button from '../../UI/Button/Button';
import { useDispatch } from 'react-redux';
import Input from '../../UI/Input/Input';

const EditCollection = (props) => {
    
    const collectionForm = {
        collection: {
          value: '',
          validation: {
            required: true
          },
          isValid: false,
          isTouched: false
        }
    };
    
    const [form, setForm] = useState(collectionForm);

    const dispatch = useDispatch();

    const changeInputHandler = (event) => {
        const tempForm = {...form};
        const tempField = {...tempForm[event.target.name]};
        tempField.value = event.target.value;
        tempField.isTouched = true;
        tempField.isValid = checkValidity(event.target.value, tempField.validation);
        tempForm[event.target.name] = tempField;
        setForm(tempForm);
    };

    useEffect(() => {
        const form = {
            collection: {
              value: props.collectionName,
              validation: {
                required: true
              },
              isValid: true,
              isTouched: true
            }
        };
        setForm(form);
    }, [props.collectionName]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(editCollection(props.collectionName, form.collection.value));
    };

    return (
        <form className={styles.EditCollection} onSubmit={handleSubmit}>
            <h3 className={styles.Header}>Edit collection</h3>
            <div className={styles.InputBox}>
                <div className={styles.Input}>
                    <Input
                        type='text'
                        name='collection'
                        placeholder='Name your collction'
                        changeInput={changeInputHandler}
                        value={form.collection.value}
                        isValid={form.collection.isValid}
                        isTouched={form.collection.isTouched}
                        message='Must be 3 or more character'
                    />
                </div>
                <div className={styles.Btn}>
                    <Button
                        type='Primary'
                        clicked={props.clicked}
                        disabled={!form.collection.isValid}
                    >Edit</Button>
                </div>
            </div>
        </form>
    );
};

export default EditCollection;