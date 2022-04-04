import React, {Fragment, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {clearMeal} from '../../../redux/order_action'
import CartItem from './CartItem'
import Modal from '../../UI/Modal'
import Checkout from './Checkout'
import classes from './Cart.module.css'
export default function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSubmitted, setOrderSubmitted] = useState(false)
  const [isError, setIsError] = useState(false)
  const {meals,totalPrice} = useSelector((state)=>state)
  const dispatch = useDispatch()
  //check if cart is empty
  const isEmptyCart = meals.length <= 0

  const mealsList = meals.map(mealItem=>{
    return (
      <CartItem 
        id={mealItem.id}
        key={mealItem.id}
        name={mealItem.name}
        amount={mealItem.amount}
        price={mealItem.price}
      />
    )
  })

  const onOrderHandler = ()=> {
    setIsCheckout(true)
  }

  const onSubmitHandler = (userInfo)=> {
    setIsSubmitting(true)
    const userOrder= {...userInfo, order:meals}
    fetch('https://food-ordering-app-1f993-default-rtdb.firebaseio.com/orders.json', {
      method:'POST',
      body:JSON.stringify(userOrder)
    }).then(res=>{
      setIsSubmitting(false)
      setOrderSubmitted(true)
      //empty cart
      dispatch(clearMeal())
    })
      .catch(e=>setIsError(true))
    
  }
  //if cart is empty hide the order button
  const orderActions = <div className={classes.actions} >
                          <button onClick={props.onCartHide} className={classes['button-alt']} >Close</button>
                          {!isEmptyCart && <button onClick={onOrderHandler}  className={classes.button}>Order</button>}
                       </div>
  //if order button is clicked, hide buttons then show user input form
  const cartActions = <Fragment>
                      <ul className={classes['cart-items']}>
                        {mealsList}
                      </ul> 
                      <div className={classes.total}>
                        <span>Total Amount</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>  
                      { !isCheckout && orderActions}
                      { isCheckout && <Checkout onSubmitHandler={onSubmitHandler} onCartHide={props.onCartHide}/>}
                      </Fragment>
  //error message element
  const errorEl =  <Fragment>
                          <p className={classes.error} >Oops, something went wrong, unable to send order, please retry</p>
                          <div className={classes.actions}>
                            <button onClick={props.onCartHide} className={classes['button-alt']} >Close</button>
                          </div> 
                        </Fragment> 
  //order sent message element
  const orderSentEl =   <Fragment>
                          <p>successfully sent order!</p>
                          <div className={classes.actions}>
                            <button onClick={props.onCartHide} className={classes['button-alt']} >Close</button>
                          </div> 
                        </Fragment>

  return (
    <Modal onCartHide={props.onCartHide}> 
          {isError && errorEl}
          {!isError && !isSubmitting && !orderSubmitted && cartActions }
          {!isError && isSubmitting && <p>sending order...</p> }
          {!isError && !isSubmitting && orderSubmitted && orderSentEl}
    </Modal>
  )
}
