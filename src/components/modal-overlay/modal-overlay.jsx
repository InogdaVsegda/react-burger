import React from 'react';
import styles from './modal-overlay.module.css';
import { modalOverlayPropTypes } from '../../utils/types'

function ModalOverlay(props) {

    const overlay = React.useRef(null)

    const handleClose = (e) => {
        if(e.target === overlay.current) {
            props.handleClick()
        }
    }
  
    return (
            <div 
                className={styles.overlay}
                ref={overlay}
                onClick={handleClose}
            >
                <div className={`p-10 ${styles.container}`}>
                    {props.children}
                </div>
            </div>
        )
  }
  
export default ModalOverlay;

ModalOverlay.propTypes = modalOverlayPropTypes