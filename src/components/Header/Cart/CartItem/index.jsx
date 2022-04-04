import {useDispatch} from 'react-redux'
import { addMeal, removeMeal } from '../../../../redux/order_action'
import classes from './CartItem.module.css';
export default function CartItem(props) {
  const dispatch = useDispatch()
  const addMealHandler = () => {
    const addMealObj = {
      id:props.id,
      name:props.name,
      amount: 1,
      price:props.price*1
     }
    dispatch(addMeal(addMealObj))
  }

  const removeMealHandler = () => {
    dispatch(removeMeal(props.id))
  }
  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>${props.price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div> 
      </div>
      <div className={classes.actions}>
        <button onClick={removeMealHandler}>−</button>
        <button onClick={addMealHandler}>+</button>
      </div>
    </li>
  );
};

