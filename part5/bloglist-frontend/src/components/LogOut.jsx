import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUser } from "../reducers/userReducer";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setUser(null));
    localStorage.removeItem("user");

    navigate("/login");
  });

  return <div>Logging Out...</div>;
};

export default LogOut;
