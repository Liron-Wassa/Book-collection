import Backdrop from '../Backdrop/Backdrop';
import styles from './Modal.module.scss';
import React from 'react';

const Modal = (props) => {
    let attachedStyles = [styles.Modal, styles.Close];

    if(props.show) {
        attachedStyles = [styles.Modal, styles.Open];
    };

    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.clicked}/>
            <div className={attachedStyles.join(' ')}>
                {props.children}
            </div>
        </React.Fragment>
    );
};

export default Modal;