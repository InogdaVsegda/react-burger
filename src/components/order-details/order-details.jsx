import React from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './order-details.module.css';

const modalRoot = document.getElementById("react-modals");


function OrderDetails({handleClick}) {

    const { order, orderRequest } = useSelector(state => state.orderReducer )
    
    return createPortal((
        <ModalOverlay handleClick={handleClick}>
            <Modal handleClick={handleClick}>
                <p className={`text text_type_digits-large mb-8 ${styles.modal_order}`}>{!orderRequest && order}</p>
                <p className={`text text_type_main-medium mb-15 ${styles.modal_text}`}>
                идентификатор заказа
                </p>
                <div className={`mb-15 ${styles.modal_icon}`}></div>
                <p className={`text text_type_main-default mb-2 ${styles.modal_text}`}>
                    Ваш заказ начали готовить
                </p>
                <p className={`text text_type_main-default text_color_inactive mb-20 ${styles.modal_text}`}>
                    Дождитесь готовности на орбитальной станции
                </p>
            </Modal>
        </ModalOverlay>
    ), modalRoot);
  }
  
export default OrderDetails;