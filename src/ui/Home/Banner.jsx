import React from "react";
import FormButton from "../form/FormButton";
import { useTranslation } from "react-i18next";

export default function Banner() {
  const { t } = useTranslation();
  return (
    <>
      <div className="banner">
        <h1>{t("home.withFREEJOB")}</h1>
        <FormButton
          content={t("home.joinNow")}
          style={{
            color: "black",
            backgroundColor: "white",
            width: "fit-content",
            marginTop: "0",
            padding: "0.5rem 0.8rem",
            fontSize: "0.75rem",
          }}
        />
      </div>
      <div className="bottom_section"></div>
    </>
  );
}
