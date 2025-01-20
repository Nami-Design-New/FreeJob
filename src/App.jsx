import { RouterProvider } from "react-router-dom";
import { router } from "./providers/router";
import useAuth from "./hooks/helpers/useAuth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsLogged } from "./redux/slices/authedUserSlice";

function App() {
  const { isAuthed, loading } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsLogged(isAuthed));
  }, [dispatch, isAuthed]);

  return loading ? null : <RouterProvider router={router} />;
}
export default App;
