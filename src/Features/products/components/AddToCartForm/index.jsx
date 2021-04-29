import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import QuantityField from "../../../../components/formControls/quantityField";

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {
    const schema = yup.object().shape({
        quantity: yup
            .number()
            .typeError("Please enter a number")
            .required("Please enter quantity")
            .min(1, "Minimum value is 1"),
    });

    const form = useForm({
        defaultValues: {
            quantity: 1,
        },
        resolver: yupResolver(schema),
    });

    async function handleSubmit(values) {
        if (onSubmit) {
            await onSubmit(values);
        }
    }
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Box>
                <QuantityField name="quantity" label="Quantity" form={form} />
            </Box>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ width: "250px" }}
                size="large"
            >
                Add to cart
            </Button>
        </form>
    );
}

export default AddToCartForm;
