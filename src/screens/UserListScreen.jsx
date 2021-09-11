import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.userList);
  useEffect(() => {
    dispatch(listUsers());
  }, []);

  const deleteHandler = (id, index) => {
    if (window.confirm("Are you sure want to suspend this user.")) {
      dispatch(deleteUser(id, index));
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>USERNAME</th>
              <th>VERIFIED</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>
                  {user.verified ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Button
                    variant={user.disabled ? "success" : "danger"}
                    className="btn-sm"
                    disabled={user.role === 0}
                    onClick={() => deleteHandler(user._id, index)}
                  >
                    {user.disabled ? "Enable" : "Disable"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
