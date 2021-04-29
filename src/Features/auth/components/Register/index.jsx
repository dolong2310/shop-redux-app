import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { register } from "../../userSlice";
import RegisterForm from "../RegisterForm";

Register.propTypes = {
    closeDialog: PropTypes.func,
};

function Register({ closeDialog }) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    async function handleSubmit(values) {
        try {
            // auto set username = email
            values.username = values.email;

            const action = register(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            // do something when register successfully
            console.log("New user", user);

            // close dialog
            if (closeDialog) closeDialog();

            enqueueSnackbar("Register successfully", { variant: "success" });
        } catch (error) {
            console.log("Failed to register", error);
            enqueueSnackbar(error.message, { variant: "error" });
        }
    }

    return (
        <>
            <RegisterForm onSubmit={handleSubmit} />
        </>
    );
}

export default Register;
