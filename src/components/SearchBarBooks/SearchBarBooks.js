import { checkValidity } from '../../utils/checkValidity';
import styles from './SearchBarBooks.module.scss';
import Button from '../UI/Button/Button';
import React, { useState } from "react";
import Input from '../UI/Input/Input';

const SearchBarBooks = (props) => {

  const searchForm = {
    term: {
      value: '',
      validation: {
        required: true
      },
      isValid: false,
      isTouched: false
    }
  };

  const [form, setForm] = useState(searchForm);

  const changeInputHandler = (event) => {
    const tempForm = {...form};
    const tempField = {...tempForm[event.target.name]};
    tempField.value = event.target.value;
    tempField.isTouched = true;
    tempField.isValid = checkValidity(event.target.value, tempField.validation);
    tempForm[event.target.name] = tempField;
    setForm(tempForm);
  };
  
  return (
    <form className={styles.Form} onSubmit={(event) => {
      props.searchBooks(event, form.term.value);
    }}>
      <div className={styles.Box}>
        <div className={styles.Input}>
          <i className={["fas fa-search", styles.Icon].join(' ')}/>
          <Input
            type='text'
            name='term'
            changeInput={changeInputHandler}
            placeholder='Search for books by / title / author'
            value={form.term.value}
            isTouched={form.term.isTouched}
            isValid={form.term.isValid}
            message='Must be 3 or more character'
          />
        </div>
        <div className={styles.Btn}>
          <Button
            type='Primary'
            disabled={!form.term.isValid}
          >Search</Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBarBooks;