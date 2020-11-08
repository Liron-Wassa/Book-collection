import styles from './Button.module.scss';
import React from 'react';

const Button = (props) => {
    let attachedStyles = [styles.Button, styles[props.type]];

    if(props.disabled) {
        attachedStyles = [styles.Button, styles.Disabled];
    };

    return <button
        className={attachedStyles.join(' ')}
        onClick={props.clicked}
        disabled={props.disabled}
    >{props.children}</button>;
};

export default Button;