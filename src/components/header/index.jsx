import {
    Badge,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { AccountCircle, Close, ShoppingCart } from "@material-ui/icons";
import HomeIcon from "@material-ui/icons/Home";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import Login from "../../Features/auth/components/Login";
import Register from "../../Features/auth/components/Register";
import { logout } from "../../Features/auth/userSlice";
import { cartItemsCountSelector } from "../../Features/cart/selectors";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: "relative",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    navLink: {
        color: "#fff",
        textDecoration: "none",
    },
    closeIcon: {
        position: "absolute",
        top: 10,
        right: 10,
    },
}));

const MODE = {
    LOGIN: "login",
    REGISTER: "register",
};

function Header() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.user.current);
    const isLoggedIn = !!loggedInUser.id; // if has user.current.id assign true and vice versa
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [mode, setMode] = useState(MODE.LOGIN);
    const cartItemsCount = useSelector(cartItemsCountSelector);

    // handle toggle dialog form sign in/sign up
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // handle toggle popup when click user icon
    const handleUserClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    // handle LOGOUT click
    const handleLogoutClick = () => {
        dispatch(logout());
        setAnchorEl(null);
    };

    // handle show mini cart
    const [anchorCartEl, setAnchorCartEl] = useState(null);

    const handleMenuCartClick = (event) => {
        setAnchorCartEl(event.currentTarget);
    };

    const handleMenuCartClose = () => {
        history.push("/cart");
        setAnchorCartEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <HomeIcon className={classes.menuButton} />
                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.navLink} to="/">
                            SHOP
                        </Link>
                    </Typography>
                    <NavLink className={classes.navLink} to="/products">
                        <Button color="inherit">Product</Button>
                    </NavLink>
                    <NavLink className={classes.navLink} to="/about">
                        <Button color="inherit">About</Button>
                    </NavLink>
                    {!isLoggedIn && (
                        <Button color="inherit" onClick={handleClickOpen}>
                            Sign in
                        </Button>
                    )}

                    {/* Mini Cart */}
                    <Box>
                        <IconButton
                            aria-label="show 1 new mails"
                            color="inherit"
                            onClick={handleMenuCartClick}
                        >
                            <Badge
                                badgeContent={cartItemsCount}
                                color="secondary"
                            >
                                <ShoppingCart />
                            </Badge>
                        </IconButton>

                        <Menu
                            anchorEl={anchorCartEl}
                            keepMounted
                            open={Boolean(anchorCartEl)}
                            onClose={handleMenuCartClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            getContentAnchorEl={null}
                        >
                            <MenuItem onClick={handleMenuCartClose}>
                                Xem giỏ hàng và thanh toán
                            </MenuItem>
                        </Menu>
                    </Box>

                    {isLoggedIn && (
                        <IconButton color="inherit" onClick={handleUserClick}>
                            <AccountCircle />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>

            <Menu
                keepMounted
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                getContentAnchorEl={null}
            >
                <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                disableBackdropClick
                disableEscapeKeyDown
            >
                <IconButton className={classes.closeIcon} onClick={handleClose}>
                    <Close />
                </IconButton>
                <DialogContent>
                    {mode === MODE.REGISTER && (
                        <>
                            <Register closeDialog={handleClose} />

                            <Box textAlign="center">
                                <Button
                                    color="primary"
                                    onClick={() => setMode(MODE.LOGIN)}
                                >
                                    Already have an account? Sign in
                                </Button>
                            </Box>
                        </>
                    )}
                    {mode === MODE.LOGIN && (
                        <>
                            <Login closeDialog={handleClose} />

                            <Box textAlign="center">
                                <Button
                                    color="primary"
                                    onClick={() => setMode(MODE.REGISTER)}
                                >
                                    Does not have an account? Sign up
                                </Button>
                            </Box>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Header;
