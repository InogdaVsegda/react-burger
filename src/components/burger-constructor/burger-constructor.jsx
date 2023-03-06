import React from 'react';
import OrderDetails from '../order-details/order-details';
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
        {isModalOpened && <OrderDetails handleClick={togglePopup}/>}
      </section>
    );
  }
  
export default BurgerConstructor;

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(APIPropTypes)
}