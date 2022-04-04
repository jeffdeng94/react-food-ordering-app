import React,{useRef} from 'react'
import { useDispatch} from 'react-redux'
import { addMeal } from '../../../redux/order_action'
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'

// const mapStateToProps =(state)=> {
//   return {
//     items:state.items,
//     totalAmount:state.totalAmount
//   }
// }


export default function MealItemForm(props) {
  const ref = useRef()
  const dispatch = useDispatch()
  const addMealHandler = (event) => {
    event.preventDefault()
    const mealAmount = ref.current.value
    const addMealObj = {
                        id:props.id,
                        name:props.name,
                        amount:mealAmount*1,
                        price:props.price*1
                       }
    dispatch(addMeal(addMealObj))
  }

  return (
    
    <form onSubmit={addMealHandler} className={classes.form}>
      <Input
          ref={ref}
          label='Amout' 
          input={{
          id:'amount_' + props.id,
          type:'number',
          min:'1',
          max:'5',
          step:'1',
          defaultValue:'1'
        }}
      />
      <button>+ Add</button>
    </form>
  )
}


// export default connect( mapStateToProps , mapDispatchToProps )(MealItemForm)