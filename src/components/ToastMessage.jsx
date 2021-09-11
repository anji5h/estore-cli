import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "react-bootstrap";
import { HIDE_TOAST } from "../constants/toastConstant";

export default function ToastMessage() {
  const dispatch = useDispatch();
  const { show, message } = useSelector((state) => state.toast);
  const handleClose = () => {
    dispatch({ type: HIDE_TOAST });
  };
  return (
    <Toast
      show={show}
      onClose={handleClose}
      style={{
        position: "absolute",
        right: 0,
        top: 100,
        zIndex: 100,
        marginLeft: "auto",
        marginRight: "auto",
        minWidth: "300px",
      }}
      delay={5000}
      autohide
    >
      <Toast.Header>
        <strong className="mr-auto">Notification</strong>
      </Toast.Header>
      <Toast.Body style={{ textTransform: "capitalize" }}>{message}</Toast.Body>
    </Toast>
  );
}
