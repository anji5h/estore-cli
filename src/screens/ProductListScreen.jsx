import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { listProducts } from "../actions/productActions";
import { useParams } from "react-router-dom";
import { formatPrice } from "../utils/formatNumber";
import httpReq from "../utils/httpReq";
import { SHOW_TOAST } from "../constants/toastConstant";
import { PRODUCT_DELETE_SUCCESS } from "../constants/productConstants";
import { USER_LOGOUT } from "../constants/userConstants";

const ProductListScreen = () => {
  const params = useParams();
  const pageNumber = params.pageNumber || 1;
  const [deleteLoading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const { loading, error, products, page, pages } = useSelector((state) => state.productList);

  useEffect(() => {
    dispatch(listProducts("", pageNumber));
    return () => setLoading(false);
  }, [pageNumber]);

  const deleteHandler = async (id, index) => {
    if (window.confirm("Are you sure want to delete it.")) {
      try {
        setLoading(true);
        await httpReq.remove(`/product/${id}`, true);
        dispatch({ type: SHOW_TOAST, payload: "product deleted" });
        dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: index });
      } catch (err) {
        if (err.response?.status === 401) {
          return dispatch({ type: USER_LOGOUT });
        }
        dispatch({ type: SHOW_TOAST, payload: err.response?.data?.message });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <LinkContainer to={`/admin/createproduct`}>
            <Button className="my-3" variant="dark">
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>S.N.</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>STOCK</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}.</td>
                  <td>{product.name}</td>
                  <td>Rs. {formatPrice(product.price)}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>{product.stock}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="success" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      disabled={deleteLoading}
                      onClick={() => deleteHandler(product._id, index)}
                      style={{ margin: " 0 5px" }}
                    >
                      <i className="far fa-trash-alt"></i>
                    </Button>
                    <LinkContainer to={`/product/${product._id}`}>
                      <Button variant="dark" className="btn-sm">
                        <i className="far fa-eye"></i>
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
