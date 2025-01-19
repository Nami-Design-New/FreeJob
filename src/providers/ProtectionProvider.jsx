import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthModal from "./../ui/modals/AuthModal";
import useAuth from "./../hooks/helpers/useAuth";
import { useDispatch } from "react-redux";
import { openModal } from "../redux/slices/authModalSlice";

function ProtectionProvider({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthed } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthed) {
      dispatch(openModal());
    }
  }, [dispatch, isAuthed, loading, navigate]);

  if (loading) {
    return null;
  }

  return (
    <>
      {isAuthed ? children : null}
      <AuthModal />
    </>
  );
}

export default ProtectionProvider;
