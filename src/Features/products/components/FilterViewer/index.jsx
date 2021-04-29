import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Box, Chip, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        flexFlow: "row wrap",

        margin: theme.spacing(2, 0),
        listStyle: "none",
        padding: 0,

        "& > li": {
            margin: 0,
            padding: theme.spacing(1),
        },
    },
}));

const FILTER_LIST = [
    {
        id: 1,
        getLabel: () => "Vận chuyển miễn phí",
        isActive: (filters) => filters.isFreeShip,
        isVisible: () => true,
        isRemovable: false,
        onRemove: () => {},
        onToggle: (filters) => {
            const newFilters = { ...filters };

            if (newFilters.isFreeShip) {
                delete newFilters.isFreeShip;
            } else {
                newFilters.isFreeShip = true;
            }

            return newFilters;
        },
    },
    {
        id: 2,
        getLabel: () => "Có khuyến mãi",
        isActive: () => true,
        isVisible: (filters) => filters.isPromotion,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };

            delete newFilters.isPromotion;

            return newFilters;
        },
        onToggle: () => {},
    },
    {
        id: 3,
        getLabel: (filters) => {
            if (filters.salePrice_gte > 0 && filters.salePrice_lte === 0) {
                filters.salePrice_lte = filters.salePrice_gte;
                filters.salePrice_gte = 0;
            }
            return `Mức giá ${filters.salePrice_gte} - ${filters.salePrice_lte}`;
        },
        isActive: () => true,
        isVisible: (filters) => {
            return (
                (filters.salePrice_gte && filters.salePrice_lte) ||
                filters.salePrice_gte >= 0 ||
                filters.salePrice_lte > 0
            );
        },
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };

            delete newFilters.salePrice_lte;
            delete newFilters.salePrice_gte;

            return newFilters;
        },
        onToggle: () => {},
    },
    // {
    //     id: 4,
    //     getLabel: (filters) => `${filters.category.name}`,
    //     isActive: () => true,
    //     isVisible: (filters) =>
    //         Object.keys(filters).includes(filters.category.name),
    //     isRemovable: true,
    //     onRemove: (filters) => {
    //         const newFilters = { ...filters };

    //         delete newFilters.category.name;

    //         return newFilters;
    //     },
    //     onToggle: () => {},
    // },
];

FilterViewer.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

function FilterViewer({ filters = {}, onChange = null }) {
    const classes = useStyles();

    const visibleFilters = useMemo(() => {
        return FILTER_LIST.filter((FILTER_LIST_ITEM) =>
            FILTER_LIST_ITEM.isVisible(filters)
        );
    }, [filters]);

    return (
        <Box component="ul" className={classes.root}>
            {visibleFilters.map((x) => (
                <li key={x.id}>
                    <Chip
                        size="small"
                        label={x.getLabel(filters)}
                        color={x.isActive(filters) ? "primary" : "default"}
                        clickable={!x.isRemovable}
                        onClick={
                            x.isRemovable
                                ? null
                                : () => {
                                      if (!onChange) return;

                                      const newFilters = x.onToggle(filters);
                                      onChange(newFilters);
                                  }
                        }
                        onDelete={
                            x.isRemovable
                                ? () => {
                                      if (!onChange) return;

                                      const newFilters = x.onRemove(filters);
                                      onChange(newFilters);
                                  }
                                : null
                        }
                    />
                </li>
            ))}
        </Box>
    );
}

export default FilterViewer;
