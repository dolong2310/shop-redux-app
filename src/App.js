import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import Header from "./components/header";
import NotFound from "./components/notfound";
import AboutFeature from "./Features/about";
import CartFeature from "./Features/cart";
import ProductsFeature from "./Features/products";

function App() {
    return (
        <>
            <Header />

            <Switch>
                <Redirect from="/home" to="/products" exact />

                <Route path="/" exact>
                    <ProductsFeature />
                </Route>

                <Route path="/products" component={ProductsFeature} />
                <Route path="/about" component={AboutFeature} />
                <Route path="/cart" component={CartFeature} />

                <Route component={NotFound} />
            </Switch>
        </>
    );
}

export default App;
