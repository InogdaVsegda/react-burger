import React from 'react';
import { modalPropTypes } from '../../utils/types'

import styles from './modal.module.css';

import { 
    CloseIcon 
} from '@ya.praktikum/react-developer-burger-ui-components'

function Modal(props) {
  
    return (
        <div className={styles.modal}>
            <div className={styles.container}>
                <h2 className={`text text_type_main-large ${styles.modal_heading}`}>{props.heading}</h2>
                <button className={styles.close_button} onClick={props.handleClick}>
                    <CloseIcon type="primary" />
                </button>
            </div>
            {props.children}
        </div>
    );
  }
  
export default Modal;

Modal.propTypes = modalPropTypes