import React from 'react'
import {useForm} from 'react-hook-form'
import classes from './Checkout.module.css'
export default function Checkout(props) {
  // use react-hook-form to apply validation
  const {register, handleSubmit, formState: { errors }} = useForm({
    mode:'onBlur' //validte value if not on blur
  })

  const onConfirmHandler = (data) => {
    const {name, street, postcode, city} = data
    const userInfo = {
                        name,
                        street,
                        postcode,
                        city
                      }
    props.onSubmitHandler(userInfo)
  }

  const isEmptyInput =(input)=>{
    return input.trim() === ''
  }

  return (
    <form onSubmit={handleSubmit(onConfirmHandler)} >
    <div className={`${classes.control} ${errors.name? classes.invalid:''}`} >
      <label htmlFor="name">Your Name</label>
      <input 
            {
              ...register('name',{
                                  required:true,
                                  validate:input=>!isEmptyInput(input)
                                  })
              } 
      type="text" id='name' />
      {errors.name && <p>Please enter a valid name</p>}
    </div>
    <div className={`${classes.control} ${errors.street? classes.invalid:''}`} >
      <label htmlFor="street">Street</label>
      <input 
            {
              ...register('street',{
                              required:true,
                              validate:input=>!isEmptyInput(input)
                              })
            } 
      type="text" id='street' />
     {errors.street && <p>Please enter a valid street</p>}
    </div>
    <div className={`${classes.control} ${errors.postcode? classes.invalid:''}`}>
      <label htmlFor="postcode">Postcode</label>
      <input 
            {...register('postcode',{
                                      required:true,
                                      maxLength: 5,
                                      minLength:5,
                                      pattern: /^[0-9]+$/,
                                      validate:input=>!isEmptyInput(input)
                                    })
            } 
      type="text" id='postcode'/>
      {errors.postcode && <p>Please enter a valid postcode (5 numbers long)</p>}
    </div>
    <div className={`${classes.control} ${errors.city? classes.invalid:''}`}>
      <label htmlFor="city">City</label>
      <input 
            {...register('city',{
                                  required:true,
                                  validate:input=>!isEmptyInput(input)
                                })
            } 
      type="text" id='city'/>
      {errors.city && <p>Please enter a valid city</p>}
    </div>
    <div className={classes.actions}>
      <button onClick={props.onCartHide} type='button'>
        Cancel
      </button>
      <button className={classes.submit}>Confirm</button>
    </div> 
  </form>
  )
}



//alternative way..use ref for form validation
  // const nameRef = useRef()
  // const streetRef = useRef()
  // const postcodeRef = useRef()
  // const cityRef = useRef()

  // const onConfirmHandler = (e)=> {
  //   e.preventDefault()
  //   const inputName = nameRef.current.value
  //   const inputStreet = streetRef.current.value
  //   const inputPostcode = postcodeRef.current.value
  //   const inputCity = cityRef.current.value
  //   const userInfo = {
  //     name:inputName,
  //     street:inputStreet,
  //     postcode:inputPostcode,
  //     city:inputCity
  //   }
  //   props.onSubmitHandler(userInfo)
  // }
