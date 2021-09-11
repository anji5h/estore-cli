import React, { useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup, Card, Button, InputGroup, FormControl } from "react-bootstrap";
import Loader from "../components/Loader";
import { listProductDetails } from "../actions/productActions";
import ProductReviewScreen from "./ProductReviewScreen";
import { formatPrice } from "../utils/formatNumber";
import CartQuantity from "../components/CartQuantity";

const ProductScreen = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(listProductDetails(params.id));
  }, []);

  return (
    <>
      <Button variant="secondary" className="my-3" onClick={history.goBack}>
        Go Back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Redirect to="/"></Redirect>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image src={`${process.env.IMAGE_URL}/${product.image}`} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item as="h4" style={{ textTransform: "capitalize" }}>
                  {product.name}
                </ListGroup.Item>
                <ListGroup.Item as="h3">
                  <span style={{ color: "orange", fontWeight: "bold" }}>
                    Rs. {formatPrice(product.price)}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description:
                  <span style={{ textTransform: "capitalize" }}>{product.description}</span>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>Rs. {product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>{product.stock > 0 ? "In Stock" : "Out Of Stock"}</Col>
                    </Row>
                  </ListGroup.Item>

                  {product.stock > 0 && <CartQuantity stock={product.stock} />}
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <ProductReviewScreen />
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
