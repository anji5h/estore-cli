import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SearchBox = () => {
  const history = useHistory();
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <div className='mr-sm-5'>
      <Form onSubmit={submitHandler} inline>
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Products..."
          className="mr-sm-2 ml-sm-5"
        ></Form.Control>
        <Button type="submit" variant="outline-secondary" className="p-2">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default SearchBox;
