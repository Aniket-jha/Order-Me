import React from "react"
import classes from "./Header.module.css"
import mealsImg from "../../assets/meals.jpg"
import HeaderCartButton from "./HeaderCartButton"

export default function Header(props) {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>Order Me</h1>
                <HeaderCartButton onClick={props.onShow}></HeaderCartButton>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImg} alt="Cover" />
            </div>
        </React.Fragment>
    )
}
