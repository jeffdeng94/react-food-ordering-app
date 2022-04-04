import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'

const Backdrop = (props)=> {
  return <div onClick={props.onCartHide} className={classes.backdrop}></div>
}

const ModalOverlay = (props)=> {
  return (
    <div className={classes.modal} >
      <div className={classes.content} >{props.children}</div>
    </div>
  )
}

export default function Modal(props) {
  const portalElement = document.getElementById('overlays')
  return (
      <Fragment>
          {ReactDOM.createPortal(<Backdrop onCartHide={props.onCartHide} />, portalElement)}
          {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
      </Fragment>
  )
}
