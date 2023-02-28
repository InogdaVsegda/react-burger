import React from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types'
import { 
    ConstructorElement,
    DragIcon,
    CurrencyIcon,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components'

import { APIPropTypes } from '../../utils/types'


function BurgerConstructor(props) {
    const data = React.useMemo(() => {
        const result = []
        props.productData?.forEach((product, i) => {
            result.push(<div key={i} className={styles.product}>
                <DragIcon type="primary"/>
                <ConstructorElement
                    text={product.name}
                    price={product.price}
                    thumbnail={product.image}
                />
            </div>
            )
        })
        return result
    }, [props.productData])

    const [isModalOpened, setModalOpened] = React.useState(false)

    const togglePopup = (e) => {
        setModalOpened(!isModalOpened)
    }

    const escFunction = React.useCallback((event) => {
        if (event.key === "Escape") {
            setModalOpened(false)
        }
    }, []);

    React.useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction]);
    
  
    return (
      <section className={`mt-25 ${styles.burger_constructor}`}>
        <div className={styles.bun}>
            <ConstructorElement
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={200}
                thumbnail={'https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/static/img-5f9ccf21a0eb45d06e57410b025f366c.png'}
            />
        </div>
        <div className={`m-4 ${styles.main_container}`}>
            {data && data.map(el => el)}
        </div>
        <div className={styles.bun}>
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text="Краторная булка N-200i (низ)"
                price={200}
                thumbnail={'https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/static/img-5f9ccf21a0eb45d06e57410b025f366c.png'}
            />
        </div>
        <div className={`mt-10 mr-4 ${styles.summary}`}>
        <p className="text text_type_digits-medium mr-2">610</p>
        <CurrencyIcon type="primary" />
        <Button htmlType="button" type="primary" size="large" onClick={togglePopup}>
            Оформить заказ
        </Button>
        </div>
        <ModalOverlay isOpened={isModalOpened} heading='' handleClick={togglePopup}>
            <p className={`text text_type_digits-large mb-8 ${styles.modal_order}`}>034536</p>
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
        </ModalOverlay>
      </section>
    );
  }
  
export default BurgerConstructor;

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(APIPropTypes)
}