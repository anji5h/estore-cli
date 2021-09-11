import React from "react";
import { useDispatch } from "react-redux";
import Loader from "./components/Loader";
import { SHOW_TOAST } from "./constants/toastConstant";
import { USER_DETAILS_SUCCESS, USER_LOGOUT } from "./constants/userConstants";
import httpReq from "./utils/httpReq";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const getAuthStatus = async () => {
    try {
      const { data } = await httpReq.get(`/user/detail`, true);
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      if (error.response?.status == 401) {
        dispatch({ type: USER_LOGOUT });
      }
      dispatch({
        type: SHOW_TOAST,
        payload: error.response?.data?.message || "failed to load user data. try again",
      });
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getAuthStatus();
    return () => setLoading(false);
  }, []);
  
  return (
    <>
      {loading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        children
      )}
    </>
  );
}
