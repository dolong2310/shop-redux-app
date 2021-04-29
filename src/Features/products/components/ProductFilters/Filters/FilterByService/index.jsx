import {
    Box,
    Checkbox,
    FormControlLabel,
    makeStyles,
    Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

FilterByService.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        borderTop: "1px solid #ccc",
    },
    list: {
        padding: 0,
        margin: 0,
        listStyle: "none",

        "& > li": {
            margin: 0,
        },
    },
}));

function FilterByService({ onChange, filters = {} }) {
    console.log("FilterByService: ", filters);
    const classes = useStyles();

    function handleChange(e) {
        if (!onChange) return;

        const { name, checked } = e.target;
        onChange({ [name]: checked });
    }
    // isPromotion & isFreeShip is boolean type on the api to checking by checkbox

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">DỊCH VỤ</Typography>

            <ul className={classes.list}>
                {[
                    { value: "isPromotion", label: "Có khuyến mãi" },
                    { value: "isFreeShip", label: "Vận chuyển miễn phí" },
                ].map((service) => (
                    <li key={service.value}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    // console.log in filters not contain isPromotion & isFreeShip
                                    // ==> service.value = undefined
                                    // solution: boolean parse it
                                    checked={Boolean(filters[service.value])}
                                    onChange={handleChange}
                                    name={service.value}
                                    color="primary"
                                />
                            }
                            label={service.label}
                        />
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FilterByService;
