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

  const handleAppleAuth = async (response) => {
    console.log("Apple Sign-In Response:", response);

    const idToken = response?.authorization?.id_token;
    if (!idToken) {
      toast.error(t("auth.appleLoginError"));
      return;
    }

    try {
      const login = await axiosInstance.post("/user/social_login", {
        login_from: "apple",
        google_token: idToken,
      });

      if (login.data.code === 200) {
        const userData = login.data.data;
        toast.success(t("auth.loginSuccess"));
        dispatch(setUser(userData));
        dispatch(setIsLogged(true));

        setCookie("token", userData.token, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        setCookie("id", userData.id, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });

        axiosInstance.defaults.headers.common["Authorization"] = userData.token;
      } else {
        toast.error(t("auth.appleLoginError"));
      }
    } catch (error) {
      console.error("Apple Login Error:", error);
      toast.error(t("auth.appleLoginError"));
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google Sign-In Response:", tokenResponse);

      if (!tokenResponse?.access_token) {
        toast.error(t("auth.googleLoginError"));
        return;
      }

      try {
        const res = await axiosInstance.post("/user/social_login", {
          login_from: "google",
          google_token: tokenResponse.access_token,
        });

        if (res.data.code === 200) {
          const userData = res.data.data;
          toast.success(t("auth.loginSuccess"));
          dispatch(setUser(userData));
          dispatch(setIsLogged(true));

          setCookie("token", userData.token, {
            path: "/",
            secure: true,
            sameSite: "Strict",
          });
          setCookie("id", userData.id, {
            path: "/",
            secure: true,
            sameSite: "Strict",
          });

          axiosInstance.defaults.headers.common["Authorization"] =
            userData.token;
        } else {
          toast.error(t("auth.googleLoginError"));
        }
      } catch (error) {
        console.error("Google Login Error:", error);
        toast.error(t("auth.googleLoginError"));
      }
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
      toast.error(t("auth.googleLoginError"));
    },
  });

  return (
    <div className="left_side">
      <header className="modal_header">
        <h1>{t("auth.loginPageTitle")}</h1>
        <p>{t("auth.loginPageSubTitle")}</p>
      </header>
      <div className="buttons">
        <button onClick={() => dispatch(setStep(2))}>
          <img src="/images/envelope.png" alt="email login" />
          <span>{t("auth.withEmail")}</span>
        </button>

        <p>{t("auth.orLoginWith")}</p>

        <button onClick={handleGoogleLogin}>
          <img src="/images/google.png" alt="google login" />
          <span>{t("auth.googleAccount")}</span>
        </button>

        <AppleSigninButton t={t} handleAppleAuth={handleAppleAuth} />
      </div>
    </div>
  );
}
