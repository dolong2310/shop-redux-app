import {
    Box,
    Button,
    makeStyles,
    TextField,
    Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";

FilterByPrice.propTypes = {
    onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        borderTop: "1px solid #ccc",
    },
    range: {
        display: "flex",
        alignItems: "center",
        flexFlow: "row nowrap",

        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),

        "& > span": {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
    },
}));

function FilterByPrice({ onChange }) {
    const classes = useStyles();
    const [values, setValues] = useState({
        salePrice_gte: 0,
        salePrice_lte: 0,
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }
    function handleSubmit() {
        console.log("FilterByPrice: ", values);
        if (onChange) onChange(values);

        setValues({
            salePrice_gte: 0,
            salePrice_lte: 0,
        });
    }

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">CHỌN MỨC GIÁ</Typography>

            <Box className={classes.range}>
                <TextField
                    name="salePrice_gte"
                    value={values.salePrice_gte}
                    onChange={handleChange}
                />
                <span>-</span>
                <TextField
                    name="salePrice_lte"
                    value={values.salePrice_lte}
                    onChange={handleChange}
                />
            </Box>

            <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={handleSubmit}
            >
                Áp dụng
            </Button>
        </Box>
    );
}

export default FilterByPrice;
