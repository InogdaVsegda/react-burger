import React from 'react';
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux';
import OrderDetails from '../order-details/order-details';
import styles from './burger-constructor.module.css';
import { 
    ConstructorElement,
    CurrencyIcon,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components'

import { getOrderNumber } from '../../services/actions/order';
import BurgerConstructorItem from './burger-constructor-item';
import { DELETE_INGR_CONSTRUCTOR, ADD_INGR_CONSTRUCTOR } from '../../services/actions/ingrConstructor';

function BurgerConstructor() {
    const { ingredients } = useSelector(state => state.ingredientsReducer)
    const { addedIngr, bunId } = useSelector(state => state.constructorReducer )

    const priceTotal = React.useMemo(() => {
        const bun = ingredients?.find(el => el._id === bunId)
        const bunPrice = (bun ? bun.price : 0) * 2

        return addedIngr?.reduce((acc, { id }) => {
            const current = ingredients?.find(el => el._id === id)?.price
            return current ? acc + current : acc
        }, bunPrice)
    }, [bunId, addedIngr])

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch({ type: ADD_INGR_CONSTRUCTOR, payload: {
            id: ingredients?.length && ingredients[0]._id,
            type: 'bun'
        } })
    }, [ingredients])

    const [ , drop] = useDrop({
        accept : "ingredient",
        drop(item) {
            const itemType = ingredients.find(el => el._id === item.id)?.type
            dispatch({ type: ADD_INGR_CONSTRUCTOR, payload: {
                id: item.id,
                type: itemType
            } })
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    });

    const handleClose = (id, index) => {
        dispatch({ type: DELETE_INGR_CONSTRUCTOR,
            id,
            index
        })
    }

    const data = React.useMemo(() => {
        const result = []
        addedIngr?.forEach((ingr, i) => {
            const product = ingredients?.find(el => el._id === ingr.id)
            product && result.push(
                <BurgerConstructorItem key={i} id={ingr.id} index={i} product={product} handleClose={handleClose} />
            )
        })
        return result
    }, [addedIngr])

    const selectedBun = (placement) => {
        const product = ingredients?.find(el => el._id === bunId)
        return product ? (
            <div className={styles.product}>
                <ConstructorElement
                    type={placement}
                    isLocked={true}
                    text={`${product.name} ${placement === 'top' ? '(верх)' : '(низ)'}`}
                    price={product.price}
                    thumbnail={product.image}
                />
            </div>
        ) : ''
    }

    const [isModalOpened, setModalOpened] = React.useState(false)

    const togglePopup = (e) => {
        setModalOpened(!isModalOpened)
    }
    
    const handleOrderButton = () => {
        const currentOrder = addedIngr.map(el => el.id)
        currentOrder.push(bunId)
        dispatch(getOrderNumber(currentOrder));
        togglePopup()
    }
  
    return (
      <section className={`mt-25 ${styles.burger_constructor}`}>
        <div className={styles.bun}>
            { selectedBun('top') }
        </div>
        <div className={`m-4 ${styles.main_container}`} ref={drop}>
            {data?.map(el => el)}
        </div>
        <div className={styles.bun}>
            { selectedBun('bottom') }
        </div>
        <div className={`mt-10 mr-4 ${styles.summary}`}>
        <p className="text text_type_digits-medium mr-2">{priceTotal}</p>
        <CurrencyIcon type="primary" />
        <Button htmlType="button" type="primary" size="large" onClick={handleOrderButton}>
            Оформить заказ
        </Button>
        </div>
        {isModalOpened && <OrderDetails handleClick={togglePopup}/>}
      </section>
    );
  }
  
export default BurgerConstructor;