import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { setIsLogged, setUser } from "../../redux/slices/authedUserSlice";
import { setStep } from "../../redux/slices/authModalSlice";
import axiosInstance from "../../utils/axios";
import AppleSigninButton from "./AppleSigninButton";

export default function LoginOptions() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [, setCookie] = useCookies(["token", "id"]);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axiosInstance.post("/user/social_login", {
          login_from: "google",
          google_token: tokenResponse.access_token,
        });

        if (res.data.code === 200) {
          toast.success(t("auth.loginSuccess"));
          dispatch(setUser(res.data.data));
          dispatch(setIsLogged(true));
          setCookie("token", res.data.data.token, {
            path: "/",
            secure: true,
            sameSite: "Strict",
          });
          setCookie("id", res.data.data.id, {
            path: "/",
            secure: true,
            sameSite: "Strict",
          });
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `${res.data.data.token}`;
        }
      } catch (error) {
        toast.error(t("auth.loginErorr"));
        throw new Error(error.message);
      }
    },
    onError: (error) => {
      console.log("Google Login Error:", error);
      toast.error(t("auth.googleLoginError"));
    },
  });

  return (
    <div className="left_side ">
      <header className="modal_header">
        <h1>{t("auth.loginPageTitle")}</h1>
        <p>{t("auth.loginPageSubTitle")}</p>
      </header>
      <div className="buttons ">
        <button onClick={() => dispatch(setStep(2))}>
          <img src="/images/envelope.png" />
          <span>{t("auth.withEmail")}</span>
        </button>

        <p>{t("auth.orLoginWith")}</p>

        <button onClick={handleGoogleLogin}>
          <img src="/images/google.png" />{" "}
          <span>{t("auth.googleAccount")}</span>
        </button>

        <AppleSigninButton t={t} />
      </div>
    </div>
  );
}
