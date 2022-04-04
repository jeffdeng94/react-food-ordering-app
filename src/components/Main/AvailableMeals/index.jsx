import React,{useEffect, useState} from 'react'
import MealItem from '../MealItem'
import Card from '../../UI/Card'
import classes from './AvailableMeals.module.css'

export default function AvailableMeals() {
  const [hasHttpError, setHasHttpError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [meals, setMeals] = useState([])
  useEffect(()=>{
    const loadedMeals = []
    fetch('https://food-ordering-app-1f993-default-rtdb.firebaseio.com/meals.json')
    .then(res=>{
          if(!res.ok){
            throw new Error('Oops, Something went wrong')
          }
          
          return res.json()
      })
    .then(mealsObj=>{
          for(const key in mealsObj){
              loadedMeals.push({
                id:key,
                name:mealsObj[key].name,
                description:mealsObj[key].description,
                price:mealsObj[key].price,
                image:mealsObj[key].image
              })
          }
          setIsLoading(false)
          setMeals(loadedMeals)
        }
    )
    .catch(err=>setHasHttpError(true))
    
  },[])

  if(isLoading){
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if(hasHttpError){
    return(
      <section className={classes.mealsError}>
        <p>{hasHttpError}</p>
      </section>
    )
  }


  const mealsList = meals.map(meal=>
        <MealItem 
          key={meal.id}
          id={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price} 
          image={meal.image}
        />
  )

  return (
    <section className={classes.meals}>
    <Card> 
       <ul>
         {mealsList}
       </ul>
    </Card>
  </section>
  )
}
