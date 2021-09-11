import React from "react";
import { Link } from "react-router-dom";
import Message from "../components/Message";
export default function PageNotFound() {
  return (
    <div>
      <Message variant="danger">
        Sorry,the page you are looking for is not available. <Link to="/">Go to homepage</Link>
      </Message>
    </div>
  );
}
