import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        showMiniCart: false,
        cartItems: [], // this state is required an objects: { id, product, quantity },...
    },
    reducers: {
        showMiniCart(state) {
            state.showMiniCart = true;
        },

        hideMiniCart(state) {
            state.showMiniCart = false;
        },

        addToCart(state, action) {
            // action required: { id, product, quantity } => newItem
            // newItem = { id, product, quantity }
            const newItem = action.payload;
            const index = state.cartItems.findIndex((x) => x.id === newItem.id);

            // if item HAS in the cart, just update quantity
            if (index >= 0) {
                // increase quantity
                state.cartItems[index].quantity += newItem.quantity;
            }
            // if item NOT in the cart, add it into
            else {
                // add to cartItems
                state.cartItems.push(newItem);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        setQuantity(state, action) {
            const { id, quantity } = action.payload;
            // check if product is available in cart
            const index = state.cartItems.findIndex((x) => x.id === id);
            if (index >= 0) {
                state.cartItems[index].quantity = quantity;
            }
        },

        removeFromCart(state, action) {
            const idNeedToRemove = action.payload;
            state.cartItems = state.cartItems.filter(
                (x) => x.id !== idNeedToRemove
            );
        },
    },
});

const { actions, reducer } = cartSlice;
export const {
    showMiniCart,
    hideMiniCart,
    addToCart,
    setQuantity,
    removeFromCart,
} = actions;
export default reducer;
