import { useContext } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css'
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

export default function Cart(props) {

    const cartCtx = useContext(CartContext)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

    const hasItems = cartCtx.items.length > 0

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1})
    }

    const cartItemRemovehandler = id => {
        cartCtx.removeItem(id)
    }

    const cartItems = <ul className = {classes['cart-items']}>
        {cartCtx.items.map(
        i => <CartItem key = {i.id} name = {i.name} amount = {i.amount} price = {i.price} onAdd = {cartItemAddHandler.bind(null, i)} onRemove = {cartItemRemovehandler.bind(null, i.id)}></CartItem>
    )}
    </ul>;

    return (
        <Modal onClose={props.onCloseCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className = {classes.actions}>
                <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}