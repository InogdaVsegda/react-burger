import React from 'react';
import PropTypes from 'prop-types'
import ModalOverlay from '../modal-overlay/modal-overlay';
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
        <ModalOverlay isOpened={isModalOpened} heading='Детали ингредиента' handleClick={togglePopup}>
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
        </ModalOverlay>
      </section>
    );
  }
  
export default BurgerIngredients;

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(APIPropTypes)
}