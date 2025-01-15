import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function ShowAll({ sectionName, ...props }) {
  const { t } = useTranslation();
  return (
    <div className="links">
      <p>{sectionName} </p>
      <Link {...props}>{t("home.viewAll")}</Link>
    </div>
  );
}
