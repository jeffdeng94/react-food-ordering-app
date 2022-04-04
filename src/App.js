import React, { useState, Fragment } from 'react'
import Cart from './components/Header/Cart'
import Header from './components/Header'
import Main from './components/Main'
export default function App() {
  const [cartIsShown, setCartIsShown] = useState(false)
  const showCart = () => {
    setCartIsShown(true)
  }
  const hideCart = () => {
    setCartIsShown(false)
  }
  return (
    <Fragment>
      {cartIsShown && <Cart onCartHide={hideCart} />}
      <Header onCartShow={showCart} />
      <Main />
    </Fragment>
  )
}
