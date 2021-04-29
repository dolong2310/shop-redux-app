import { Box, makeStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import categoryApi from "../../../../../../api/categoryApi";

FilterByCategory.propTypes = {
    onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        minHeight: "190px",
    },
    menu: {
        padding: 0,
        margin: 0,
        listStyle: "none",

        "& > li": {
            marginTop: theme.spacing(1),
            transition: "all 0.2s linear",

            "&:hover": {
                color: theme.palette.primary.dark,
                cursor: "pointer",
            },
        },
    },
}));

function FilterByCategory({ onChange }) {
    const classes = useStyles();
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await categoryApi.getAll();
                console.log({ response });
                setCategoryList(
                    response.map((x) => ({
                        id: x.id,
                        name: x.name,
                    }))
                );
            } catch (error) {
                console.log("Failed to fetch category list", error);
            }
        })();
    }, []);

    function handleCategoryClick(categoryId) {
        if (onChange) onChange(categoryId);
    }

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>
            <ul className={classes.menu}>
                {categoryList.map((category) => (
                    <li
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                    >
                        <Typography variant="body2">{category.name}</Typography>
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FilterByCategory;
