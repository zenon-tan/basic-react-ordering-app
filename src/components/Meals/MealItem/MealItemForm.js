import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'
import { useRef, useState } from 'react'

export default function MealItemForm(props) {

    const amountInputRef = useRef()

    const [amountIsValid, setAmountIsValid] = useState(true);

    const submitHandler = event => {
        event.preventDefault()
        // Using useRef
        const enteredAmount = amountInputRef.current.value
        const enteredAmountNumber = +enteredAmount;

        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false)
            return;
        }

        props.onAddToCart(enteredAmountNumber)

    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input label='Amount' ref = {amountInputRef} input={{id: 'amount_' + props.id, type: 'number', min:'1', max:'5', step:'1', defaultValue:'1'}}></Input>
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
        </form>
    )
}