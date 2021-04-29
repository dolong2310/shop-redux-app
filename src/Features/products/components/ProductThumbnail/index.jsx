import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import {
    STATIC_HOST,
    THUMBNAIL_PLACEHOLDER,
} from "../../../../constants/index";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

ProductThumbnail.propTypes = {
    product: PropTypes.object,
};

function ProductThumbnail({ product }) {
    const thumbnailUrl = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail?.url}`
        : THUMBNAIL_PLACEHOLDER;

    const arr = [thumbnailUrl, thumbnailUrl, thumbnailUrl];

    return (
        <Box maxWidth="100%">
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                swipeable={true}
                showStatus={false}
            >
                {arr.map((item, index) => (
                    <div key={index}>
                        <img src={item} alt={product.name} width="100%" />
                    </div>
                ))}
            </Carousel>
        </Box>
    );
}

export default ProductThumbnail;
