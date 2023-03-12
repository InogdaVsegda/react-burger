import React, {useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IngredientDetails from '../ingredient-details/ingredient-details';
import styles from './burger-ingredients.module.css';
import { 
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components'

import Ingredient from '../ingredient/Ingredient';
import { getIngredients } from '../../services/actions/ingredients';

function BurgerIngredients() {
    const dispatch = useDispatch();

    useEffect(
        () => {
          dispatch(getIngredients());
        },
        [dispatch]
      );

    const [isModalOpened, setModalOpened] = React.useState(false)

    const togglePopup = (e) => {
        setModalOpened(!isModalOpened)
    }

    const escFunction = React.useCallback((event) => {
        if (event.key === "Escape") {
            setModalOpened(false)
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction]);

    const {ingredients, ingredientsRequest} = useSelector(state => state.ingredientsReducer)
    
    const {bun: buns, sauce: sauces, main} = React.useMemo(() => {
        const result = {
            bun: [],
            sauce: [],
            main: []
        }

        if(!ingredientsRequest && ingredients) {
            ingredients.forEach((product, i) => {
                result[product.type]
                .push(<Ingredient
                    key={product._id}
                    {...product}
                    handleClick={(e) => {
                        dispatch({
                            type: 'SET_CURRENT_INGREDIENT',
                            currentIngr: product
                        })
                        togglePopup()
                    }}
                />)
            })
        }

        return result
    }, [ingredientsRequest, ingredients])

    const [current, setCurrent] = React.useState('Булки')

    const ingridientsWrapperRef = useRef()
    const bunRef = useRef()
    const sauceRef = useRef()
    const mainRef = useRef()

    const handleScroll = (e) => {
        const ingridientsWrapperPosition = bunRef.current?.scrollTop
        const bunPosition = bunRef.current?.getBoundingClientRect().top
        const saucePosition = sauceRef.current?.getBoundingClientRect().top
        const mainPosition = mainRef.current?.getBoundingClientRect().top

        const bunDistance = Math.abs(ingridientsWrapperPosition - bunPosition)
        const sauceDistance = Math.abs(ingridientsWrapperPosition - saucePosition)
        const mainDistance = Math.abs(ingridientsWrapperPosition - mainPosition)

        const minGap = Math.min(
            bunDistance,
            sauceDistance,
            mainDistance,
        )

        const closestTab = minGap === bunDistance ? 'Булки' : minGap === sauceDistance ? 'Соусы' : 'Начинки'

        setCurrent(closestTab)
    }
  
    return (
      <section className={`mr-10 ${styles.burger_ingredients}`}>
        <h1 className={`text text_type_main-large mt-10 ${styles.heading}`}>Соберите бургер</h1>
        <div style={{ display: 'flex' }} className='mt-5'>
            <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
        <div className={`mt-10 ${styles.ingredients}`} onScroll={handleScroll} ref={ingridientsWrapperRef}>
            <h2 ref={bunRef} className={`text text_type_main-medium ${styles.list_heading}`}>Булки</h2>
            <ul className={`mt-6 mb-10 pl-4 pr-4 ${styles.list}`}>
                {buns && buns.map(el => el)}
            </ul>
            <h2 ref={sauceRef} className={`text text_type_main-medium ${styles.list_heading}`}>Соусы</h2>
            <ul className={`mt-6 mb-10 pl-4 pr-4 ${styles.list}`}>
                {sauces && sauces.map(el => el)}
            </ul>
            <h2 ref={mainRef} className={`text text_type_main-medium ${styles.list_heading}`}>Начинки</h2>
            <ul className={`mt-6 mb-10 pl-4 pr-4 ${styles.list}`}>
                {main && main.map(el => el)}
            </ul>
        </div>
        {isModalOpened && <IngredientDetails 
            heading='Детали ингредиента'
            handleClick={togglePopup}/>}
      </section>
    );
  }
  
export default BurgerIngredients;