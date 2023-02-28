import React from 'react';
import { createPortal } from 'react-dom';
import Modal from '../modal/modal';
import styles from './modal-overlay.module.css';
import { modalOverlayPropTypes } from '../../utils/types'

const modalRoot = document.getElementById("react-modals");

function ModalOverlay(props) {

    const overlay = React.useRef(null)

    const handleClose = (e) => {
        if(e.target === overlay.current) {
            props.handleClick()
        }
    }
  
    return createPortal(
        (
            <div 
                style={{visibility: props.isOpened ? 'visible' : 'hidden'}}
                className={styles.overlay}
                ref={overlay}
                onClick={handleClose}
            >
                <div className={`p-10 ${styles.container}`}>
                    <Modal heading={props.heading} handleClick={props.handleClick}>
                        {props.children}
                    </Modal>
                </div>
            </div>
        ),
        modalRoot
    );
  }
  
export default ModalOverlay;

ModalOverlay.propTypes = modalOverlayPropTypes