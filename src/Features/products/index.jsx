import { Box } from "@material-ui/core";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import DetailPage from "./pages/DetailPage";
import ListPage from "./pages/ListPage";

ProductsFeature.propTypes = {};

function ProductsFeature(props) {
    const match = useRouteMatch();
    return (
        <Box pt={4}>
            <Switch>
                <Route path={match.url} exact component={ListPage} />
                <Route
                    path={`${match.url}/:productId`}
                    component={DetailPage}
                />
            </Switch>
        </Box>
    );
}

export default ProductsFeature;
