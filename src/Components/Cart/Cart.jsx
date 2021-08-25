import { useContext,useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForms/CheckoutForm";
export default function Cart(props) {
  const [isCheckout,setIsCheckout]=useState(false)
  const [isSubmittting,setIsSubmitting]=useState(false)
  const [didSubmit,setDidSubmit]=useState(false)
  const ctx = useContext(CartContext);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };
  const orderHandler=()=>{
    setIsCheckout(true)
  }
  const submitUserHandler= async (userData)=>{
    setIsSubmitting(true)
     await fetch("https://starwars-basic-default-rtdb.firebaseio.com/orders.json",{
      method:"POST",
      body:JSON.stringify({
        userField:userData,
        orderedItems:ctx.items
      })

    })
    setIsSubmitting(false)
    setDidSubmit(true)
    ctx.clearItem()
  }
  const cartItem = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  const modalActions=<div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHide}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={orderHandler}>
            {" "}
            Order
          </button>
        )}
      </div>
      const submittingModalContent=<p>Sending Order data... </p>
      const cartModalContent= <>{cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
     {isCheckout && <CheckoutForm onClose={props.onHide}  onSubmit={submitUserHandler}/> } 
     {!isCheckout && modalActions}</>
  const didSubmitModal=<>
  <p>Your order is confirmed!!!</p>
  <div className={classes.actions}>
        <button className={classes["button"]} onClick={props.onHide}>
          Close
        </button>
        </div>
  </>

  return (
    <Modal onClose={props.onHide}>
      
      {!isSubmittting && !didSubmit && cartModalContent}
      {isSubmittting && submittingModalContent}
      {didSubmit && didSubmitModal}
    </Modal>
  );
}
