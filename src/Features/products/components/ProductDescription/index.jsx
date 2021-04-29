import { Box } from "@material-ui/core";
import DOMPurify from "dompurify";
import React from "react";

ProductDescription.propTypes = {};

function ProductDescription({ product = {} }) {
    var cleanHTML = DOMPurify.sanitize(product.description);
    return <Box padding={4} dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
}

export default ProductDescription;
