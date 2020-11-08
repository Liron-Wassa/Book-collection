import styles from './Spinner.module.scss';
import React from 'react';

const Spinner = (props) => (
    <div className={styles.Loader} style={{width: props.width, height: props.height}}>Loading...</div>
);

export default Spinner;