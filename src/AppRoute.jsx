import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import CreateProductScreen from "./screens/ProductCreateScreen";
import PageNotFound from "./screens/PageNotFound";
import CartScreen from "./screens/CartScreen";

const PublicRoute = ({ component: Component, user, ...rest }) => (
  <Route {...rest} render={(props) => (user ? <Redirect to="/" /> : <Component {...props} />)} />
);

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (user ? <Component {...props} /> : <Redirect to="/login" />)}
  />
);

const AdminRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (user && user.role === 0 ? <Component {...props} /> : <Redirect to="/" />)}
  />
);

export default function AppRoute() {
  const { user } = useSelector((state) => state.userDetails);
  return (
    <Router>
      <Header />
      <main style={{ padding: "100px 0 10px" }}>
        <Container>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/search/:keyword" component={HomeScreen} />
            <Route exact path="/page/:pageNumber" component={HomeScreen} />
            <Route exact path="/search/:keyword/page/:pageNumber" component={HomeScreen} />
            <PublicRoute exact path="/login" component={LoginScreen} user={user} />
            <PublicRoute exact path="/register" component={RegisterScreen} user={user} />
            <PrivateRoute exact path="/profile" component={ProfileScreen} user={user} />
            <AdminRoute exact path="/admin/userlist" component={UserListScreen} user={user} />
            <AdminRoute
              exact
              path="/admin/productlist"
              component={ProductListScreen}
              exact
              user={user}
            />
            <AdminRoute
              path="/admin/createproduct"
              component={CreateProductScreen}
              exact
              user={user}
            />
            <AdminRoute
              path="/admin/productlist/:pageNumber"
              component={ProductListScreen}
              exact
              user={user}
            />
            <AdminRoute
              exact
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
              user={user}
            />
            <Route exact path="/product/:id" component={ProductScreen} />
            <PrivateRoute exact path="/cart" component={CartScreen} user={user} />
            <Route component={PageNotFound}></Route>
          </Switch>
        </Container>
      </main>
    </Router>
  );
}
