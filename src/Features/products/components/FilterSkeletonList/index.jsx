import { Avatar, Box } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import PropTypes from "prop-types";
import React from "react";

FilterSkeletonList.propTypes = {
    lengthCategories: PropTypes.number,
    lengthPrice: PropTypes.number,
    lengthServices: PropTypes.number,
};

FilterSkeletonList.defaultProps = {
    lengthCategories: 6,
    lengthPrice: 2,
    lengthServices: 2,
};

function FilterSkeletonList({ lengthCategories, lengthPrice, lengthServices }) {
    return (
        <Box padding={1}>
            <Box marginTop={1}>
                <Skeleton variant="h1" width="80%" />
            </Box>
            {Array.from(new Array(lengthCategories)).map((x, index) => (
                <Box marginTop={1}>
                    <Skeleton width="50%" />
                </Box>
            ))}

            <Box marginTop={1}>
                <Skeleton variant="h1" width="80%" />
                <Box display="flex" alignItems="center">
                    <Box marginTop={1} width="50%">
                        <Skeleton width="90%" />
                    </Box>
                    <Box marginTop={1} width="50%">
                        <Skeleton width="90%" />
                    </Box>
                </Box>
                <Box marginTop={1}>
                    <Skeleton width="30%" />
                </Box>
            </Box>

            <Box marginTop={1}>
                <Skeleton variant="h1" width="80%" />
                {Array.from(new Array(lengthServices)).map((x, index) => (
                    <Box
                        marginTop={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Skeleton variant="circle">
                            <Avatar />
                        </Skeleton>
                        <Skeleton width="70%" />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default FilterSkeletonList;
