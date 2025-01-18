import { useTranslation } from "react-i18next";
import { calculateDate } from "../../../utils/helper";
import StarsRate from "../../StartRate";

export default function OwnerComponent({ item }) {
  const { t } = useTranslation();
  return (
    <section className="owner_card">
      <img className="user_img" src={item.user.image} />
      <section className="user_info">
        <h6>{item.user.name}</h6>
        <StarsRate rate={item.user.rate} />
        <p>
          <span>{t("projects.signUpDate")}</span>
          <span>{calculateDate(item?.user?.created_at)}</span>
        </p>
      </section>
    </section>
  );
}
