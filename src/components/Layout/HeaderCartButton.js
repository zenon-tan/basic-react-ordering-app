import React, { useContext, useEffect, useState } from 'react'
import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon.js'
import CartContext from '../../store/cart-context'

export default function HeaderCartButton(props) {

    const [btnHighlighted, setBtnHighlighted] = useState(false)

    const cartCtx = useContext(CartContext);

    // reduce() requires 2 args
    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);


    const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump : ''}`

    // Using useEffect to animate the cart button
    useEffect(() => {
        if(cartCtx.items.length === 0) {
            return;
        }
        setBtnHighlighted(true)

        const timer = setTimeout(() => {
            setBtnHighlighted(false)
        }, 300)

        return () => {
            clearTimeout(timer)
        }
        
    }, [cartCtx.items])
        
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon></CartIcon>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}