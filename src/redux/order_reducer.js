const initState = {
  meals: [],
  totalPrice: 0
}

export default function orderReducer(preState = initState, action) {
  const { type, meal, id } = action
  switch (type) {
    case 'ADD': {
      //check if added meal already exist
      //get the existing meal index
      const existingMealIndex = preState.meals.findIndex(item => item.id === meal.id)
      //get the exiting meal
      const existingMeal = preState.meals[existingMealIndex]

      let updatedMeal
      let updatedMeals
      //if meal already exist in cart
      if (existingMeal) {
        //update the existing meal
        updatedMeal = { ...existingMeal, amount: existingMeal.amount + meal.amount }
        //copy previous state meals
        updatedMeals = [...preState.meals]
        //update meals
        updatedMeals[existingMealIndex] = updatedMeal
      } else {
        updatedMeal = { ...meal }
        updatedMeals = preState.meals.concat(updatedMeal)
      }
      //calculate the total price
      let updatedTotalPrice = preState.totalPrice + meal.price * meal.amount
      return {
        meals: updatedMeals,
        totalPrice: +updatedTotalPrice.toFixed(2)
      }
    }

    case 'REMOVE': {
      //get the existing meal index
      const existingMealIndex = preState.meals.findIndex(item => item.id === id)
      //get the exiting meal
      const existingMeal = preState.meals[existingMealIndex]

      let updatedMeal
      let updatedMeals
      //if exiting meal only has 1, then remove the meal in the list
      if (existingMeal.amount === 1) {
        updatedMeals = preState.meals.filter(meal => meal.id !== id)
      } else {
        updatedMeal = { ...existingMeal, amount: existingMeal.amount - 1 }
        //copy previous state meals
        updatedMeals = [...preState.meals]
        //update meals
        updatedMeals[existingMealIndex] = updatedMeal
      }
      //calculate the total price
      let updatedTotalPrice = preState.totalPrice - existingMeal.price * 1
      return {
        meals: updatedMeals,
        totalPrice: +updatedTotalPrice.toFixed(2)
      }
    }

    case 'CLEAR': {
      return {
        meals: [],
        totalPrice: 0
      }
    }

    default:
      return preState
  }
}
