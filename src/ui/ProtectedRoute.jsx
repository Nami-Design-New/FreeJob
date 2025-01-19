import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/slices/authModalSlice";
import { redirect, useNavigate } from "react-router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.authedUser.isLogged);
  const [cookies] = useCookies(["token", "id"]);
  const token = cookies?.token;
  useEffect(() => {
    if (!token && !isLogged) {
      navigate("/", { replace: false });
      dispatch(openModal());
    }
  }, [token, isLogged, navigate, dispatch]);

  return children;
}
