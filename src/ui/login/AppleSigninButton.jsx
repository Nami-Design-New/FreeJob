import AppleSignin from "react-apple-signin-auth";

const AppleSigninButton = ({ t, handleAppleAuth }) => (
  <AppleSignin
    authOptions={{
      // clientId: process.env.REACT_APP_APPLE_CLIENT_ID,
      scope: "email name",
      // redirectURI: process.env.REACT_APP_APPLE_REDIRECT_URI,
      state: "state",
      nonce: "nonce",
      usePopup: true,
    }}
    uiType="dark"
    buttonExtraChildren="Continue with Apple"
    onSuccess={(response) => handleAppleAuth(response)}
    onError={(error) => console.error(error)}
    skipScript={false}
    iconProp={{ style: { marginTop: "10px" } }}
    render={(props) => (
      <button {...props} className="">
        <img src={"/icons/Apple.svg"} alt="apple" />
        <span>{t("auth.appleAccount")}</span>
      </button>
    )}
  />
);

export default AppleSigninButton;
