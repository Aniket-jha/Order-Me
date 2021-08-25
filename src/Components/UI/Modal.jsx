import { Fragment } from "react"
import ReactDOM from "react-dom"
import classes from "./Modal.module.css"


const BackDrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>
}
const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}
const portalElements = document.getElementById("overlays")
export default function Modal(props) {

    return (
        <Fragment>
            {ReactDOM.createPortal(<BackDrop onClose={props.onClose} />, portalElements)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElements)}
        </Fragment>
    )
}
