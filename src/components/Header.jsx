import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import httpReq from "../utils/httpReq";
import { SHOW_TOAST } from "../constants/toastConstant";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userDetails);
  const logoutHandler = async () => {
    try {
      await httpReq.get("/auth/logout", true);
      dispatch(logout());
    } catch (err) {
      dispatch({ type: SHOW_TOAST, payload: "Failed to logout. Try again." });
    }
  };

  return (
    <header>
      <Navbar
        fixed="top"
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
        style={{ minHeight: "90px" }}
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>E-STORE</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ml-auto">
              {user && (
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i> cart
                  </Nav.Link>
                </LinkContainer>
              )}
              {user ? (
                <NavDropdown title={user.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> sign in
                  </Nav.Link>
                </LinkContainer>
              )}
              {user?.role === 0 && (
                <NavDropdown title="admin-portal" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>products</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
