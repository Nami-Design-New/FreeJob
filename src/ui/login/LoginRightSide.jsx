import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa";

export default function LoginRightSide() {
  const { t } = useTranslation();
  return (
    <div className="right_side">
      <h6>{t("auth.largest_platform")} </h6>
      <ul>
        <li>
          <FaCheck />
          <p>{t("auth.categories_count")} </p>
        </li>
        <li>
          <FaCheck />
          <p>{t("auth.quality_work")} </p>
        </li>
        <li>
          <FaCheck />
          <p>{t("auth.access_global")} </p>
        </li>
      </ul>
    </div>
  );
}
