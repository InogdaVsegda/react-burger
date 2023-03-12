import { createPortal } from 'react-dom';
import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

import { modalPropTypes } from '../../utils/types'
const modalRoot = document.getElementById("react-modals");


function IngredientDetails({heading, handleClick}) {

    const { currentIngr } = useSelector(state => state.currentReducer)
    
    return createPortal((
        <ModalOverlay handleClick={handleClick}>
            <Modal handleClick={handleClick} heading={heading}>
                <img src={currentIngr?.image} alt={currentIngr?.name} className={`mb-4 ${styles.modal_image}`}/>
                <p className={`text text_type_main-medium mb-8 ${styles.modal_text}`}>
                {currentIngr?.name}
                </p>
                <ul className={`mb-5 ${styles.modal_details}`}>
                    <li className={styles.modal_detail}>
                        <p className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</p>
                        <p className="text text_type_digits-default text_color_inactive">{currentIngr?.calories}</p>
                    </li>
                    <li className={styles.modal_detail}>
                        <p className="text text_type_main-default text_color_inactive mb-2">Белки, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{currentIngr?.proteins}</p>
                    </li>
                    <li className={styles.modal_detail}>
                        <p className="text text_type_main-default text_color_inactive mb-2">Жиры, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{currentIngr?.fat}</p>
                    </li>
                    <li className={styles.modal_detail}>
                        <p className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{currentIngr?.carbohydrates}</p>
                    </li>
                </ul>
            </Modal>
        </ModalOverlay>
    ), modalRoot);
  }
  
export default IngredientDetails;

IngredientDetails.propTypes = modalPropTypes