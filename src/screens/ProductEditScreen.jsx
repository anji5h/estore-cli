import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import ProductFormScreen from "./ProductFormScreen";

export default function ProductEditScreen() {
  const params = useParams();
  const dispatch = useDispatch();
  const productId = params.id;
  const { loading, error, product } = useSelector((state) => state.productDetails);

  React.useEffect(() => {
    dispatch(listProductDetails(params.id));
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Redirect to="/admin/productlist"></Redirect>
      ) : (
        <ProductFormScreen title={"Edit product"} edit={true} product={product} />
      )}
    </>
  );
}
