import { useRef,useState } from "react"
import classes from "./MealItemForm.module.css"
import Input from "../../UI/Input"
export default function MealsForm(props) {
    const [isAmountValid,setAmountIsValid]=useState(true)
    const amountInputRef=useRef()
    const submitHandler=(event)=>{
        event.preventDefault()
        const enteredAmount=amountInputRef.current.value
        const enteredAmountNumber=+enteredAmount
        if(enteredAmount.trim().length===0 || enteredAmountNumber<1 || enteredAmountNumber>5){
            setAmountIsValid(false)
            return;
        }
        props.onAddtoCart(enteredAmountNumber)
    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input label="Amount"  ref={amountInputRef} input={{
                id: 'amount' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} />
            <button>Add+</button>
            {!isAmountValid && <p>Please Enter amount between 1-5</p>}
        </form>
    )
}
