import { Box, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { useHistory } from "react-router";
import {
    STATIC_HOST,
    THUMBNAIL_PLACEHOLDER,
} from "../../../../constants/index";
import { formatPrice } from "../../../../utils";

Product.propTypes = {
    product: PropTypes.object,
};

function Product({ product }) {
    const history = useHistory();
    const thumbnailUrl = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail?.url}`
        : THUMBNAIL_PLACEHOLDER;

    function handleClick() {
        // Navigate to detail page: /product/:productId
        history.push(`/products/${product.id}`);
    }

    return (
        <Box padding={1} onClick={handleClick}>
            <Box maxWidth="100%">
                <img src={thumbnailUrl} alt={product.name} width="100%" />
            </Box>
            <Typography variant="body2">{product.name}</Typography>
            <Typography variant="body2">
                <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
                    {formatPrice(product.salePrice)}
                </Box>
                {product.promotionPercent > 0
                    ? ` -${product.promotionPercent}%`
                    : ""}
            </Typography>
        </Box>
    );
}

export default Product;