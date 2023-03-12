import React from 'react';
import { useDrag } from "react-dnd";
import { ingredientPropTypes } from '../../utils/types'

import styles from './ingredient.module.css';

import { 
    CurrencyIcon,
    Counter
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux';

function Ingredient(props) {

    const {name, type, price, image, handleClick} = props;
    const id = props._id 

    const { addedIngr } = useSelector(state => state.constructorReducer )

    const count = React.useMemo(() => {
      return addedIngr?.filter(el => el.id === id).length
    }, [addedIngr, id])

    const [, dragIngr] = useDrag({
      type: 'ingredient',
      item: {id},
      typeOfIngr: {type},
    });
    
    return (
      <li className={styles.item} id={id} onClick={handleClick} ref={dragIngr}>
        <img src={image} alt={name} />
        <div className={styles.price}>
            <p className='text text_type_digits-default mr-2'>{price}</p>
            <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${styles.name}`}>{name}</p>
        { count > 0 && <Counter count={count} size="default" extraClass="m-1" /> }
      </li>
    );
  }
  
export default Ingredient;

Ingredient.propTypes = ingredientPropTypes