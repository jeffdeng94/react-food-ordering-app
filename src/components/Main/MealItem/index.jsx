import React from 'react'
import MealItemForm from '../MealItemForm'
import classes from './MealItem.module.css'

export default function MealItem(props) {
  return (
    <li key={props.id} className={classes.meal}>
      <div className={classes.info}>
        <div>
          <img className={classes.img} src={props.image} alt={props.name} />
        </div>
        <div>
          <h3>{props.name}</h3>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>${props.price}</div>
        </div>
      </div>
      <div>
        <MealItemForm
          key={props.id}
          id={props.id}
          name={props.name}
          description={props.description}
          price={props.price}
        />
      </div>
    </li>
  )
}
