export const addMeal = meal => {
  return { type: 'ADD', meal }
}

export const removeMeal = id => {
  return { type: 'REMOVE', id }
}

export const clearMeal = () => {
  return { type: 'CLEAR' }
}
