import React, {Fragment} from 'react'
import HeaderCartButton from './HeaderCartButton'
import classes from './Header.module.css'
export default function Header(props) {
  return (
    <Fragment>
      <header className={classes.header} >
        <h1>React Meals</h1>
        <HeaderCartButton onCartShow={props.onCartShow}/>
      </header>
      <div className={classes['main-image']} >
        <img src='https://wallpaperaccess.com/full/767033.jpg' alt="A table full of delicious food!" />
      </div>
    </Fragment>
  )
}
