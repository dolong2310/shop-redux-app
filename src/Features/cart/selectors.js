import { createSelector } from "reselect";

const cartItemsSelector = (state) => state.cart.cartItems;

// Count quantity number of products in cart
export const cartItemsCountSelector = createSelector(
    cartItemsSelector,
    (cartItems) => cartItems.reduce((count, item) => count + item.quantity, 0)
);

// Calculate total price of cart
export const cartTotalSelector = createSelector(
    cartItemsSelector,
    (cartItems) =>
        cartItems.reduce(
            (total, item) => total + item.product.salePrice * item.quantity,
            0
        )
);
