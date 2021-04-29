import {
    Box,
    Container,
    Grid,
    LinearProgress,
    makeStyles,
    Paper,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router";
import { addToCart } from "../../../cart/cartSlice";
import AddToCartForm from "../../components/AddToCartForm";
import ProductAdditional from "../../components/ProductAdditional";
import ProductDescription from "../../components/ProductDescription";
import ProductInfo from "../../components/ProductInfo";
import ProductMenu from "../../components/ProductMenu";
import ProductReviews from "../../components/ProductReviews";
import ProductThumbnail from "../../components/ProductThumbnail";
import useProductDetail from "../../hooks/useProductDetail";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(3),
    },

    left: {
        width: "400px",
        padding: theme.spacing(1.5),
        borderRight: `1px solid ${theme.palette.grey[300]}`,
    },

    right: {
        flex: "1 1 0",
        padding: theme.spacing(1.5),
    },

    loading: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
    },
}));

function DetailPage(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    // from /product/:productId, we have an id number of product
    // console.log(const match = useRouteMatch()) and take it
    const {
        params: { productId }, // nested object destructuring to get productId
        url,
    } = useRouteMatch();

    // custom hook useProductDetail() => fetch product api => get product info & loading status
    const { product, loading } = useProductDetail(productId);

    if (loading) {
        return (
            <Box className={classes.loading}>
                <LinearProgress />
            </Box>
        );
    }

    function handleAddToCartSubmit(formValues) {
        const action = addToCart({
            id: product.id,
            product,
            quantity: formValues.quantity,
        });
        console.log(action);

        dispatch(action);
    }

    return (
        <Box className={classes.root}>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item className={classes.left}>
                            <ProductThumbnail product={product} />
                        </Grid>

                        <Grid item className={classes.right}>
                            <ProductInfo product={product} />
                            <AddToCartForm onSubmit={handleAddToCartSubmit} />
                        </Grid>
                    </Grid>
                </Paper>

                <Paper elevation={0}>
                    <ProductMenu />
                </Paper>

                <Paper elevation={0}>
                    <Switch>
                        <Route path={url} exact>
                            <ProductDescription product={product} />
                        </Route>

                        <Route
                            path={`${url}/additional`}
                            component={ProductAdditional}
                            exact
                        />
                        <Route
                            path={`${url}/reviews`}
                            component={ProductReviews}
                            exact
                        />
                    </Switch>
                </Paper>
            </Container>
        </Box>
    );
}

export default DetailPage;
