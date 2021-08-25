import { useContext,useEffect,useState } from "react"
import CardIcon from "../Cart/CardIcon"
import classes from "./HeaderCart.module.css"
import CartContext from "../../Store/cart-context"
export default function HeaderCartButton(props) {
    const [btnIsHighLighted,setBtnisHighLighted]=useState(false)
    const ctx=useContext(CartContext)
    const {items}=ctx
    const numberOfCartItem=items.reduce((curNumber,item)=>{
        return(
            curNumber+item.amount
        )
    },0)
    useEffect(()=>
    {
        if(items.length===0){
            return;
        }
        setBtnisHighLighted(true)
        const timer=setTimeout(()=>{
            setBtnisHighLighted(false)
        },300)
        return ()=>{
            clearTimeout(timer)
        }
    },[items])
    const btnClasses=`${classes.button} ${btnIsHighLighted ? classes.bump: ''} `
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CardIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItem}</span>
        </button>
    )
}
