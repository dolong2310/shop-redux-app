import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import productApi from "../../../../api/productApi";
import FilterSkeletonList from "../../components/FilterSkeletonList";
import FilterViewer from "../../components/FilterViewer";
import ProductFilters from "../../components/ProductFilters";
import ProductList from "../../components/ProductList";
import ProductSkeletonList from "../../components/ProductSkeletonList";
import ProductSort from "../../components/ProductSort";

ListPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
    root: {},
    left: {
        width: "250px",
    },
    right: {
        flex: "1 1 0",
    },
    pagination: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexFlow: "row nowrap",
        marginTop: "30px",
        paddingBottom: "20px",
    },
}));

function ListPage(props) {
    const classes = useStyles();
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);

    const history = useHistory();
    const location = useLocation();
    const queryParams = queryString.parse(location.search);

    const [pagination, setPagination] = useState({
        limit: 9,
        total: 10,
        page: 1,
    });
    const [filters, setFilters] = useState(() => ({
        ...queryParams,
        _page: Number.parseInt(queryParams._page) || 1,
        _limit: Number.parseInt(queryParams._limit) || 9,
        _sort: queryParams._sort || "salePrice:ASC",
    }));

    // when filters change => sync pathname/search on URL (search is behind the "?" character)
    // solution: use hook history to push it on URL
    useEffect(() => {
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    }, [history, filters]);

    useEffect(() => {
        (async () => {
            try {
                const { data, pagination } = await productApi.getAll(filters);
                setProductList(data);
                setPagination(pagination);
                console.log({ data, pagination });
            } catch (error) {
                console.log("Failed to fetch product list ", error);
            }

            setLoading(false);
        })();
    }, [filters]);

    function handlePageChange(e, page) {
        setFilters((prevFilters) => ({
            ...prevFilters,
            _page: page,
        }));
    }

    function handleSortChange(newSortValue) {
        setFilters((prevFilters) => ({
            ...prevFilters,
            _sort: newSortValue,
        }));
    }

    function handleFiltersChange(newFilters) {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters,
        }));
    }

    function setNewFilters(newFilters) {
        setFilters(newFilters);
    }

    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            {loading ? (
                                <FilterSkeletonList />
                            ) : (
                                <ProductFilters
                                    filters={filters}
                                    onChange={handleFiltersChange}
                                />
                            )}
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            <ProductSort
                                currentSort={filters._sort}
                                onChange={handleSortChange}
                            />
                            <FilterViewer
                                filters={filters}
                                onChange={setNewFilters}
                            />
                            {loading ? (
                                <ProductSkeletonList length={9} />
                            ) : (
                                <ProductList data={productList} />
                            )}
                            <Box>
                                <Pagination
                                    color="primary"
                                    count={Math.ceil(
                                        pagination.total / pagination.limit
                                    )}
                                    page={pagination.page}
                                    onChange={handlePageChange}
                                    className={classes.pagination}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;
