import { checkValidity } from '../../../utils/checkValidity';
import { addCollection } from '../../../store/actions';
import styles from './NewCollection.module.scss';
import Button from '../../UI/Button/Button';
import { useDispatch } from 'react-redux';
import Input from '../../UI/Input/Input';
import React, { useState } from 'react';

const NewCollection = (props) => {

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

    const resetForm = () => {
        const form = {
            collection: {
              value: '',
              validation: {
                required: true
              },
              isValid: false,
              isTouched: false
            }
        };
        setForm(form);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addCollection(form.collection.value, props.book));
        resetForm();
    };

    return (
        <form className={styles.NewCollection} onSubmit={handleSubmit}>
            <h3 className={styles.Header}>Create new collection</h3>
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
                    >Add</Button>
                </div>
            </div>
        </form>
    );
};

export default NewCollection;