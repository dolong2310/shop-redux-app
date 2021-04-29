import { yupResolver } from "@hookform/resolvers/yup";
import {
    Box,
    Button,
    Container,
    Grid,
    makeStyles,
    Paper,
    Typography,
} from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import QuantityField from "../../components/formControls/quantityField";
import { STATIC_HOST } from "../../constants";
import { formatPrice } from "../../utils";
import { removeFromCart, setQuantity } from "./cartSlice";
import { cartItemsCountSelector, cartTotalSelector } from "./selectors";

CartFeature.propTypes = {};
const useStyles = makeStyles((theme) => ({
    root: {},

    heading: {
        margin: theme.spacing(2, 0),

        "& > h6": {
            fontWeight: "bold",
        },
    },

    productList: {
        display: "flex",
        flexFlow: "column",
    },

    productItem: {
        display: "flex",
    },

    productThumbnail: {
        "& > img": {
            maxWidth: "100%",
            width: "130px",
        },
    },

    productInfo: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flex: 1,
        marginLeft: theme.spacing(2),
    },

    productName: {},

    productControl: {
        marginTop: theme.spacing(2),

        "& > button": {
            minWidth: "30px",
        },
    },

    productControlLabel: {
        fontSize: "12px",
        textTransform: "lowercase",
        color: theme.palette.primary.main,
    },

    productPrice: {},

    itemBoxInfoPrice: {
        textAlign: "end",
        fontWeight: "bold",
    },

    productPriceBox: {
        display: "flex",
        marginTop: theme.spacing(1),
    },
    productPriceBoxOriginalPrice: {
        color: theme.palette.grey[500],
        textDecoration: "line-through",
    },
    productPriceBoxPromotionPercent: {
        fontWeight: "bold",
        marginLeft: theme.spacing(2),
        position: "relative",

        "&::after": {
            content: "''",
            position: "absolute",
            width: "1px",
            height: "12px",
            top: "4px",
            left: "-6px",
            backgroundColor: "#000",
        },
    },
}));

function CartFeature(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const cartTotalPrice = useSelector(cartTotalSelector);
    const cartItemsCountNumber = useSelector(cartItemsCountSelector);

    const cartItems = useSelector((state) => state.cart.cartItems);

    function handleRemoveItem(id) {
        const action = removeFromCart(id);
        dispatch(action);
    }

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

    function handleSubmit(id, { quantity }) {
        const formValues = {
            id: id,
            quantity: Number.parseInt(quantity),
        };
        const action = setQuantity(formValues);
        dispatch(action);
    }

    return (
        <Container className={classes.root}>
            <Box className={classes.heading}>
                <Typography variant="subtitle1">
                    GIỎ HÀNG ({cartItemsCountNumber} sản phẩm)
                </Typography>
            </Box>
            <Grid container spacing={2} className={classes.content}>
                <Grid item className={classes.left} xs={8}>
                    <Paper elevation={1}>
                        {/* PRODUCT lIST */}
                        <Box
                            component="ul"
                            padding={2}
                            className={classes.productList}
                        >
                            {/* PRODUCT ITEM */}
                            {cartItems.map((item) => (
                                <Box
                                    component="li"
                                    key={item.product.id}
                                    className={classes.productItem}
                                >
                                    {/* PRODUCT THUMBNAIL */}
                                    <Box className={classes.productThumbnail}>
                                        <img
                                            src={`${STATIC_HOST}${item.product.thumbnail?.url}`}
                                            alt={item.product.name}
                                        />
                                    </Box>
                                    {/* PRODUCT INFO */}
                                    <Box className={classes.productInfo}>
                                        {/* PRODUCT NAME */}
                                        <Box className={classes.productName}>
                                            <Typography variant="subtitle1">
                                                {item.product.name}
                                            </Typography>
                                            <Box
                                                className={
                                                    classes.productControl
                                                }
                                            >
                                                <Button
                                                    size="small"
                                                    onClick={() =>
                                                        handleRemoveItem(
                                                            item.product.id
                                                        )
                                                    }
                                                >
                                                    <Typography
                                                        className={
                                                            classes.productControlLabel
                                                        }
                                                    >
                                                        xoá
                                                    </Typography>
                                                </Button>
                                            </Box>
                                        </Box>
                                        {/* PRODUCT PRICE */}
                                        <Box className={classes.productPrice}>
                                            <Typography
                                                className={
                                                    classes.itemBoxInfoPrice
                                                }
                                            >
                                                {formatPrice(
                                                    item.product.salePrice
                                                )}
                                            </Typography>

                                            {/* PRODUCT PRICE BOX */}
                                            {item.product.promotionPercent ===
                                            0 ? null : (
                                                <Box
                                                    className={
                                                        classes.productPriceBox
                                                    }
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        className={
                                                            classes.productPriceBoxOriginalPrice
                                                        }
                                                    >
                                                        {formatPrice(
                                                            item.product
                                                                .originalPrice
                                                        )}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        className={
                                                            classes.productPriceBoxPromotionPercent
                                                        }
                                                    >
                                                        {`-${item.product.promotionPercent}%`}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>

                                    {/* PRODUCT QUANTITY */}
                                    <Box>
                                        <form
                                            onChange={form.handleSubmit(() =>
                                                handleSubmit(
                                                    item.product.id,
                                                    form.getValues()
                                                )
                                            )}
                                        >
                                            <Box>
                                                <QuantityField
                                                    name="quantity"
                                                    form={form}
                                                />
                                            </Box>
                                        </form>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item className={classes.right} xs={4}>
                    <Paper elevation={1}>
                        <Box padding={2}>
                            <Typography>
                                Thành tiền: {formatPrice(cartTotalPrice)}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default CartFeature;
