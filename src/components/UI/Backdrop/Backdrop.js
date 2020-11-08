import styles from './Backdrop.module.scss';
import React from 'react';

const Backdrop = (props) => (
    props.show ? <div className={styles.Backdrop} onClick={props.clicked} /> : null
);

export default Backdrop;