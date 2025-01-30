import { useState } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const PasswordField = ({ label, ...props }) => {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const [showPass, setShowPass] = useState(false);
  const handleInputType = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };
  console.log(lang);
  console.log(showPass);

  return (
    <div className="input-field">
      <label className="mb-3" htmlFor={props.id}>
        {label}
      </label>
      <div className="pass-group">
        <Form.Control
          className="form-control"
          placeholder={t("password")}
          type={showPass ? "text" : "password"}
          required
          {...props}
          style={{ cursor: "pointer", backgroundColor: "#E8FAF4" }}
        />
        <span
          className={`${lang === "ar" ? "ar" : ""}`}
          onClick={handleInputType}
        >
          <i
            className={`fa-regular ${!showPass ? "fa-eye-slash" : "fa-eye"}`}
          />
        </span>
      </div>
    </div>
  );
};

export default PasswordField;
