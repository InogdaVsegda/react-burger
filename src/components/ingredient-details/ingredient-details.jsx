import React from 'react';
import { createPortal } from 'react-dom';
import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './ingredient-details.module.css';
// import PropTypes from 'prop-types'

// import { APIPropTypes } from '../../utils/types'
const modalRoot = document.getElementById("react-modals");


function IngredientDetails({heading, handleClick, currentIngredient}) {
    
    return createPortal((
        <ModalOverlay handleClick={handleClick}>
            <Modal handleClick={handleClick} heading={heading}>
                <img src={currentIngredient?.image} alt={currentIngredient?.name} className={`mb-4 ${styles.modal_image}`}/>
                <p className={`text text_type_main-medium mb-8 ${styles.modal_text}`}>
                {currentIngredient?.name}
                </p>
                <ul className={`mb-5 ${styles.modal_details}`}>
                    <li className={styles.modal_detail}>
                        <p className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</p>
                        <p className="text text_type_digits-default text_color_inactive">{currentIngredient?.calories}</p>
                    </li>
                    <li className={styles.modal_detail}>
                        <p className="text text_type_main-default text_color_inactive mb-2">Белки, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{currentIngredient?.proteins}</p>
                    </li>
                    <li className={styles.modal_detail}>
                        <p className="text text_type_main-default text_color_inactive mb-2">Жиры, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{currentIngredient?.fat}</p>
                    </li>
                    <li className={styles.modal_detail}>
                        <p className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{currentIngredient?.carbohydrates}</p>
                    </li>
                </ul>
            </Modal>
        </ModalOverlay>
    ), modalRoot);
  }
  
export default IngredientDetails;

// BurgerConstructor.propTypes = {
//     ingredients: PropTypes.arrayOf(APIPropTypes)
// }