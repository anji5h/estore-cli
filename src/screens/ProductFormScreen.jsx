import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, Link, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import httpReq from "../utils/httpReq";
import { errorLabelStyle } from "./LoginScreen";

export default function ProductFormScreen({ product, title, edit = false }) {
  const [error, setError] = React.useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    errors,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: product.name || null,
      brand: product.brand || null,
      category: product.category || null,
      description: product.description || null,
      price: product.price || 0,
      stock: product.stock || 0,
    },
  });
  const imageRef = React.useRef(null);

  //preview image on select
  const previewImage = (e) => {
    if (!imageRef.current) return;
    const file = e.target.files;
    if (file?.length && file[0].type.split("/")[0] === "image") {
      return (imageRef.current.src = URL.createObjectURL(file[0]));
    }
    imageRef.current.src = "";
  };

  const submitHandler = async (data) => {
    try {
      const formData = new FormData();
      if (data.image?.length) formData.append("image", data.image[0], data.image[0].name);
      delete data.image;
      for (let key in data) {
        formData.append(key, data[key]);
      }
      edit && params.id
        ? await httpReq.put(`/admin/products/${params.id}`, formData, true)
        : await httpReq.post("/admin/products", formData, true);
      history.push("/admin/productlist");
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch({ type: USER_LOGOUT });
      }
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <FormContainer>
      <h1>{title}</h1>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={handleSubmit(submitHandler)} encType="multipart/formdata">
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            placeholder="Enter product name"
            ref={register({ required: "* required" })}
            isInvalid={errors.name}
          ></Form.Control>
          <Form.Control.Feedback type="invalid" style={errorLabelStyle}>
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              placeholder="Enter product price"
              ref={register({
                required: "* required",
                pattern: { value: /^[0-9]+$/, message: "price must be number" },
              })}
              isInvalid={errors.price}
            ></Form.Control>
            <Form.Control.Feedback type="invalid" style={errorLabelStyle}>
              {errors.price?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              name="brand"
              placeholder="Enter product brand"
              ref={register({ required: "* required" })}
              isInvalid={errors.brand}
            ></Form.Control>
            <Form.Control.Feedback type="invalid" style={errorLabelStyle}>
              {errors.brand?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="stock">
            <Form.Label>Stock Count</Form.Label>
            <Form.Control
              name="stock"
              placeholder="Enter product stock count"
              ref={register({
                required: "* required",
                pattern: { value: /^[0-9]+$/, message: "stock count must be number" },
              })}
              isInvalid={errors.stock}
            ></Form.Control>
            <Form.Control.Feedback type="invalid" style={errorLabelStyle}>
              {errors.stock?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              defaultValue=""
              name="category"
              id="inlineFormCustomSelectPref"
              custom
              placeholder="Select product category"
              ref={register({ required: "* required" })}
              isInvalid={errors.category}
            >
              <option value="" disabled>
                Select product category
              </option>
              <option value="electronic device">Electronic devices</option>
              <option value="health and beauty">Health &amp; Beauty</option>
              <option value="smartphone and computers">Smartphone &amp; Computers</option>
              <option value="babies and toys">Babies and Toys</option>
              <option value="groceries and pets">Groceries &amp; Pets</option>
              <option value="fashion and lifestyle">Fashion &amp; Lifestyle</option>
              <option value="sports and outdoor">Sports &amp; Outdoor</option>
              <option value="books and stationery">Books &amp; Stationery</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid" style={errorLabelStyle}>
              {errors.category?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="description"
            ref={register({
              required: "* required",
            })}
            isInvalid={errors.description}
            placeholder="Enter product description"
          ></Form.Control>
          <Form.Control.Feedback type="invalid" style={errorLabelStyle}>
            {errors.description?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <img
            ref={imageRef}
            alt={product.name}
            src={`${process.env.IMAGE_URL}/${product.image}`}
            className="product-image"
          ></img>
          <Form.File id="formcheck-api-custom" custom>
            <Form.File.Input
              name="image"
              ref={register({
                required: product?.image ? false : "* required",
              })}
              onChange={previewImage}
              isInvalid={errors.image}
              accept="image/*"
            />
            <Form.File.Label data-browse="Choose">Choose product image</Form.File.Label>
            <Form.Control.Feedback type="invalid" style={errorLabelStyle}>
              {errors.image?.message}
            </Form.Control.Feedback>
          </Form.File>
        </Form.Group>

        <Button type="submit" variant="primary" disabled={isSubmitting}>
          Submit
        </Button>
        <Link to="/admin/productlist" style={{ marginLeft: "10px" }}>
          <Button type="button" variant="dark">
            Go Back
          </Button>
        </Link>
      </Form>
    </FormContainer>
  );
}
