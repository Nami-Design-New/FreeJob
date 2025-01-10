import { useTranslation } from "react-i18next";
import SearchBox from "../header/SearchBox";

export default function Search() {
  const { t } = useTranslation();
  return (
    <section className="search_home container-fluid">
      <section className="content">
        <section className="content_text">
          <p>{t("home.heroSectionTitle")} </p>
          <p>{t("home.heroSectionSubTitle")}</p>
        </section>
        <SearchBox placeholder="Search for any service..." />
      </section>
    </section>
  );
}
