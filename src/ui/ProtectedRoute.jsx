import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/slices/authModalSlice";
import { redirect, useNavigate } from "react-router";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = true;
  console.log(isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const show = useSelector((state) => state.authModal.show);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: false });
      // dispatch(openModal());
    }
  }, [isAuthenticated]);

  return children;
}
