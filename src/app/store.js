import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/auth/userSlice";
import cartReducer from "../Features/cart/cartSlice";

const rootReducer = {
    user: userReducer,
    cart: cartReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
