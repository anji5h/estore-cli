import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { LinkContainer } from "react-router-bootstrap";
import { formatPrice } from "../utils/formatNumber";

const Product = ({ product }) => {
  return (
    <LinkContainer to={`/product/${product._id}`}>
      <Card>
        <Card.Img
          src={`${process.env.IMAGE_URL}/${product.image}`}
          variant="top"
          className="card-image"
        />
        <Card.Body>
          <Card.Title as="div" className="card-name">
            {product.name}
          </Card.Title>
          <Card.Text as="div">
            <Rating value={product.rating} text={`${product.reviews} reviews`} />
          </Card.Text>
          <Card.Text as="h4" style={{ color: "orange", fontWeight: "bold" }}>
            Rs. {formatPrice(product.price)}
          </Card.Text>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
};

export default Product;
