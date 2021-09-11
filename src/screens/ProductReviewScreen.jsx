import React from "react";
import { Col, Form, ListGroup, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { listProductReview } from "./../actions/productActions";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

export default function ProductReviewScreen() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
    reset,
  } = useForm();
  const params = useParams();
  const { user } = useSelector((state) => state.userDetails);
  const { loading, reviews, error } = useSelector((state) => state.productReviewList);

  React.useEffect(() => {
    dispatch(listProductReview(params.id));
  }, []);

  const submitHandler = async (data) => {
    try {
      await httpReq.post(`/product/reviews/${params.id}`, data, true);
      dispatch({ type: SHOW_TOAST, payload: "review added" });
    } catch (err) {
      if (err.response?.status === 401) {
        return dispatch({ type: USER_LOGOUT });
      }
      dispatch({ type: SHOW_TOAST, payload: err.response?.data?.message || err.message });
    } finally {
      reset();
    }
  };
  return (
    <Col md={7}>
      <h2>Reviews</h2>
      <ListGroup variant="flush">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {reviews.length === 0 && <Message>No Reviews</Message>}
            {reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
          </>
        )}
        <ListGroup.Item>
          <h2>Write a Customer Review</h2>
          {user ? (
            <Form>
              <Form.Group controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Control as="select">
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="comment">
                <Form.Label>Comment</Form.Label>
                <Form.Control as="textarea" row="4"></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Form>
          ) : (
            <Message>
              Please <Link to="/login">sign in</Link> to write a review
            </Message>
          )}
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
}
