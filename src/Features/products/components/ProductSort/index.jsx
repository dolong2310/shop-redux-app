import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs } from "@material-ui/core";

ProductSort.propTypes = {
    currentSort: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

function ProductSort({ currentSort, onChange }) {
    // currentSort default value from parent component is salePrice:ASC => string type
    function handleSortChange(e, newValue) {
        // newValue is a value on Tab component => type string
        if (onChange) onChange(newValue);
    }

    return (
        <Tabs
            value={currentSort} // default value 'salePrice:ASC'
            indicatorColor="primary"
            textColor="primary"
            onChange={handleSortChange} // trigger to value property change
            aria-label="disabled tabs example"
        >
            <Tab label="Gía từ thấp tới cao" value="salePrice:ASC" />
            <Tab label="Gía từ cao tới thấp" value="salePrice:DESC" />
        </Tabs>
    );
}

export default ProductSort;
