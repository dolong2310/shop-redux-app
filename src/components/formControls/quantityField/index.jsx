import { Box, IconButton, makeStyles, Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";
import React from "react";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
    root: {},

    box: {
        display: "flex",
        alignItems: "center",
        flexFlow: "row nowrap",
        maxWidth: "200px",
    },
}));

QuantityField.propTypes = {};

function QuantityField(props) {
    const classes = useStyles();
    const { form, name, label, disabled } = props;
    const { errors, setValue } = form;
    const hasError = !!errors[name];

    return (
        <FormControl error={hasError} fullWidth variant="outlined" size="small">
            <Typography>{label}</Typography>
            <Controller
                name={name}
                control={form.control}
                render={({ onChange, onBlur, value, name }) => (
                    <Box className={classes.box}>
                        <IconButton
                            onClick={() =>
                                setValue(
                                    name,
                                    Number.parseInt(value)
                                        ? Number.parseInt(value) - 1
                                        : 1
                                )
                            }
                        >
                            <RemoveCircleOutline />
                        </IconButton>
                        <OutlinedInput
                            name={name}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            id={name}
                            type="number"
                            disabled={disabled}
                        />
                        <IconButton
                            onClick={() =>
                                setValue(
                                    name,
                                    Number.parseInt(value)
                                        ? Number.parseInt(value) + 1
                                        : 1
                                )
                            }
                        >
                            <AddCircleOutline />
                        </IconButton>
                    </Box>
                )}
            />

            <FormHelperText error={hasError}>
                {errors[name]?.message}
            </FormHelperText>
        </FormControl>
    );
}

export default QuantityField;
