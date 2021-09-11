import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useForm } from "react-hook-form";
import { errorLabelStyle } from "./LoginScreen";
import httpReq from "../utils/httpReq";
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RegisterScreen = () => {
  const history = useHistory();
  const [error, setError] = React.useState(null);
  const {
    register,
    errors,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      await httpReq.post("/auth/signup", data);
      history.push("/login");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.Group controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            name="name"
            placeholder="Enter name"
            ref={register({ required: "* required" })}
            isInvalid={errors.name}
          ></Form.Control>
          <Form.Control.Feedback type="invalid" style={errorLabelStyle}>
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            placeholder="Enter username"
            ref={register({ required: "* required" })}
            isInvalid={errors.username}
          ></Form.Control>
          <Form.Control.Feedback type="invalid" style={errorLabelStyle}>
            {errors.username?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            name="email"
            placeholder="Enter email"
            ref={register({
              required: "* required",
              pattern: { value: emailRegex, message: "invalid email address." },
            })}
            isInvalid={errors.email}
          ></Form.Control>
          <Form.Control.Feedback type="invalid" style={errorLabelStyle}>
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            ref={register({
              required: "* required",
              minLength: { value: 8, message: "password must have 8 characters or more." },
            })}
            isInvalid={errors.password}
          ></Form.Control>
          <Form.Control.Feedback type="invalid" style={errorLabelStyle}>
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="repassword"
            ref={register({
              validate: (value) => watch('password') === value || "password don't match",
            })}
            isInvalid={errors.repassword}
            placeholder="Confirm password"
          ></Form.Control>
          <Form.Control.Feedback type="invalid" style={errorLabelStyle}>
            {errors.repassword?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary" disabled={isSubmitting}>
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account?
          <Link to="/login"> Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
