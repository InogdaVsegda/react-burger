import React from 'react';
import PropTypes from 'prop-types'
import IngredientDetails from '../ingredient-details/ingredient-details';
import styles from './burger-ingredients.module.css';
import { 
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components'

import Ingredient from '../ingredient/Ingredient';
import { APIPropTypes } from '../../utils/types'

function BurgerIngredients(props) {

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

    const [currentIngredient, setCurrentIngredient] = React.useState(null)

    const setDataCurrentIngr = (id) => {
        const product = props.productData.find(x => x._id === id);
        setCurrentIngredient({
            id: product._id,
            name: product.name,
            calories: product.calories,
            proteins: product.proteins,
            fat: product.fat,
            carbohydrates: product.carbohydrates,
            image: product.image_large
        })
        
    } 
    
    const {bun: buns, sauce: sauces, main} = React.useMemo(() => {
        const result = {
            bun: [],
            sauce: [],
            main: []
        }
        
        props.productData?.forEach((product, i) => {
            result[product.type]
            .push(<Ingredient
                key={product._id}
                name={product.name}
                price={product.price}
                image={product.image}
                handleClick={(e) => {
                    setDataCurrentIngr(product._id)
                    togglePopup()
                }}
            />)
        })

        return result
        // eslint-disable-next-line
    }, [props.productData])

    const [current, setCurrent] = React.useState('Булки')
  
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
        <div className={`mt-10 ${styles.ingredients}`}>
            <h2 className={`text text_type_main-medium ${styles.list_heading}`}>Булки</h2>
            <ul className={`mt-6 mb-10 pl-4 pr-4 ${styles.list}`}>
                {buns && buns.map(el => el)}
            </ul>
            <h2 className={`text text_type_main-medium ${styles.list_heading}`}>Соусы</h2>
            <ul className={`mt-6 mb-10 pl-4 pr-4 ${styles.list}`}>
                {sauces && sauces.map(el => el)}
            </ul>
            <h2 className={`text text_type_main-medium ${styles.list_heading}`}>Начинки</h2>
            <ul className={`mt-6 mb-10 pl-4 pr-4 ${styles.list}`}>
                {main && main.map(el => el)}
            </ul>
        </div>
        {isModalOpened && <IngredientDetails 
            heading='Детали ингредиента'
            handleClick={togglePopup}
            currentIngredient={currentIngredient}/>}
      </section>
    );
  }
  
export default BurgerIngredients;

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(APIPropTypes)
}