import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if(action.type === 'ADD') {
    
        const newTotalAmount = state.totalAmount + action.item.price * action.item.amount
        // using findIndex to check the values, and get the index if the item already exists in the cart
        const existingCartItemIndex = state.items.findIndex(i => i.id === action.item.id)
        // get the existing item
        const existingCartItem = state.items[existingCartItemIndex]

        let updatedItems;

        // If existing item exists, we update the amount of the item
        if (existingCartItem) {

            let updatedItem;

            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            // Then we grab the items of the current state, and update that particular item with the updated item
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            // if not we just concat the new item to the current state
            updatedItems = state.items.concat(action.item)
        }
        
        // return the new state snapshot
        return {
            items: updatedItems,
            totalAmount: newTotalAmount
        }
    } 

    if(action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(i => i.id === action.id)
        const existingCartItem = state.items[existingCartItemIndex]

        const updatedTotalAmount = state.totalAmount - existingCartItem.price

        let updatedItems;
        if(existingCartItem.amount === 1) {
            // if false, filter() will remove the item from the array
            updatedItems = state.items.filter(i => i.id !== action.id)
        } else {
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1}
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
        
    }
    return defaultCartState
}

const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCarthandler = item => {
        dispatchCartAction({type: 'ADD', item: item})
    }

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE', id: id})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCarthandler,
        removeItem: removeItemFromCartHandler
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;