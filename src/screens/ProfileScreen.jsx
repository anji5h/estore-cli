import React from "react";
import { Form, Button, ListGroup, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import httpReq from "../utils/httpReq";
import { SHOW_TOAST } from "../constants/toastConstant";
import { USER_LOGOUT } from "../constants/userConstants";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userDetails);
  const {
    register,
    errors,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      await httpReq.put("/user/update/password", data, true);
      dispatch({ type: SHOW_TOAST, payload: "password updated" });
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch({ type: USER_LOGOUT });
      }
      dispatch({ type: SHOW_TOAST, payload: err.response?.data?.message || err.message });
    }
  };

  return (
    <>
      <h2>User Details</h2>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Row>
            <Col md={5}>Full Name : </Col>
            <Col>{user.name}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col md={5}>Username : </Col>
            <Col>{user.username}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col md={5}>Email Address : </Col>
            <Col>{user.email}</Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>

      <h2>Change Password</h2>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.Group controlId="oldPassword">
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            name="old_password"
            placeholder="Old password"
            ref={register({
              required: "* required",
            })}
            isInvalid={errors.old_password}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.old_password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="new_password"
            placeholder="New password"
            ref={register({
              required: "* required",
              minLength: { value: 8, message: "password must have 8 characters or more." },
            })}
            isInvalid={errors.new_password}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.new_password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            name="confrim_password"
            placeholder="Confirm new password"
            ref={register({
              validate: (value) => watch("new_password") === value || "password don't match",
            })}
            isInvalid={errors.confrim_password}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.confrim_password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          Submit
        </Button>
        <LinkContainer to="/" style={{ marginLeft: "10px" }}>
          <Button type="button" variant="dark">
            Go Back
          </Button>
        </LinkContainer>
      </Form>
    </>
  );
};

export default ProfileScreen;
