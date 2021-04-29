import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../userSlice";
import LoginForm from "../LoginForm";

Login.propTypes = {
    closeDialog: PropTypes.func,
};

function Login({ closeDialog }) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    async function handleSubmit(values) {
        try {
            const action = login(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            // do something when login successfully
            console.log("New user", user);

            // close dialog
            if (closeDialog) closeDialog();
        } catch (error) {
            console.log("Failed to login", error);
            enqueueSnackbar(error.message, { variant: "error" });
        }
    }

    return (
        <>
            <LoginForm onSubmit={handleSubmit} />
        </>
    );
}

export default Login;
