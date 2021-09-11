import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import Message from "../components/Message";
import { getCart, removeFromCart } from "../actions/cartActions";
import Loader from "../components/Loader";

const CartScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { isLoading, isError, data } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const removeFromCartHandler = (id, index) => {
    dispatch(removeFromCart(id, index));
  };

  const checkoutHandler = () => {
    alert("Do you want to checkout?");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">Something went wrong.</Message>
        ) : (
          <ListGroup variant="flush">
            {data.map((item, index) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={`${process.env.IMAGE_URL}/${item.product?.image}`}
                      alt={item.product?.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Link to={`/product/${item.product?._id}`}>
                        <span style={{ textTransform: "capitalize" }}>{item.product?.name}</span>
                      </Link>
                    </Row>
                    <Row>Price: ${item.product.price}</Row>
                    <Row>Quantity: {item.quantity}</Row>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id, index)}
                    >
                      <i style={{ color: "red" }} className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({data.reduce((acc, item) => acc + item.quantity, 0)}) items</h2>$
              {data.reduce((acc, item) => acc + item.quantity * item.product?.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={data.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
