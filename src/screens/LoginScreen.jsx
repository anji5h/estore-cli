import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useForm } from "react-hook-form";
import httpReq from "../utils/httpReq";
import { useDispatch } from "react-redux";
import { USER_DETAILS_SUCCESS } from "../constants/userConstants";

export const errorLabelStyle = {
  fontSize: "13px",
  color: "red",
};
export default function LoginScreen() {
  const dispatch = useDispatch();
  const [error, setError] = React.useState(null);
  const {
    register,
    errors,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await httpReq.post("/auth/login", data, true);
      dispatch({ type: USER_DETAILS_SUCCESS, payload: response.data.user });
    } catch (err) {
      setError(err.response?.data?.message || "unknown error occurred. try again");
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="email">
          <Form.Label>Email Address or Username</Form.Label>
          <Form.Control
            name="username"
            ref={register({ required: true })}
            isInvalid={errors.username}
          ></Form.Control>
          <Form.Control.Feedback type="invalid" style={errorLabelStyle}>
            * required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            isInvalid={errors.password}
            ref={register({ required: true })}
          ></Form.Control>
          <Form.Control.Feedback type="invalid" style={errorLabelStyle}>
            * required
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="primary"
        >
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}
