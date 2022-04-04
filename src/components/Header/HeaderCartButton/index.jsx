import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import CartIcon from '../../UI/CartIcon'
import classes from './HeaderCartButton.module.css'
export default function HeaderCartButton(props) {
  const [hasBumpEffect, setHasBumpEffect] = useState(false)
  const mealsArray = useSelector((state)=>state.meals)
  //create bump effect for the cart icon everytime the cart list changes
  useEffect(()=>{
    if(mealsArray.length === 0) {
      return
    }else{
      setHasBumpEffect(true)
      const timer = setTimeout(() => {
        setHasBumpEffect(false)
      }, 300);
      //clear timeout once effect is applied
      return ()=> {clearTimeout(timer)}
    }
  }, [mealsArray])
  const totalMeals = mealsArray.reduce((prev, curr)=>prev + curr.amount,0)
  return (
    <button onClick={props.onCartShow} className={`${classes.button} ${hasBumpEffect? classes.bump : ''}`} >
    <span className={classes.icon}>
     <CartIcon/>
    </span>
    <span>Yout Cart</span>
    <span className={classes.badge}>{totalMeals}</span>
  </button>
  )
}
