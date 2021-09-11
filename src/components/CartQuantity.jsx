import React from "react";
import { ListGroup, InputGroup, Button, FormControl } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import httpReq from "../utils/httpReq";

export default function CartQuantity({ stock }) {
  const history = useHistory();
  const params = useParams();
  const [qty, setQty] = React.useState(1);
  const addToCartHandler = async () => {
    try {
      await httpReq.post(`/product/cart/${params.id}`, { quantity: qty }, true);
      history.push(`/cart`);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };
  return (
    <>
      <ListGroup.Item style={{ textAlign: "center" }}>Quantity:</ListGroup.Item>
      <ListGroup.Item>
        <InputGroup>
          <InputGroup.Prepend>
            <Button
              variant="outline-secondary"
              onClick={() => setQty((Prev) => Prev + 1)}
              disabled={qty >= stock}
            >
              <i className="fas fa-plus"></i>
            </Button>
          </InputGroup.Prepend>
          <FormControl
            aria-describedby="basic-addon1"
            value={qty}
            readOnly
            style={{ textAlign: "center" }}
          />
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              onClick={() => setQty((Prev) => Prev - 1)}
              disabled={qty <= 1}
            >
              <i className="fas fa-minus"></i>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </ListGroup.Item>
      <ListGroup.Item>
        <Button
          onClick={addToCartHandler}
          className="btn-block"
          type="button"
          disabled={stock === 0}
        >
          Add To Cart
        </Button>
      </ListGroup.Item>
    </>
  );
}
