import React from 'react';
import { ingredientPropTypes } from '../../utils/types'

import styles from './ingredient.module.css';

import { 
    CurrencyIcon,
    Counter
} from '@ya.praktikum/react-developer-burger-ui-components'

function Ingredient(props) {
  
    return (
      <li className={styles.item} id={props.id} onClick={props.handleClick}>
        <img src={props.image} alt={props.name} />
        <div className={styles.price}>
            <p className='text text_type_digits-default mr-2'>{props.price}</p>
            <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${styles.name}`}>{props.name}</p>
        <Counter count={1} size="default" extraClass="m-1" />
      </li>
    );
  }
  
export default Ingredient;

Ingredient.propTypes = ingredientPropTypes