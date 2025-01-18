import { Breadcrumb } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function DetailsHeader({ links }) {
  const { t } = useTranslation();
  return (
    <section className="details_header">
      <Breadcrumb>
        <Breadcrumb.Item href="/">{t("routes.home")}</Breadcrumb.Item>
        {typeof links !== "string" ? (
          links.map((link, index) => (
            <Breadcrumb.Item key={index} href={`/${link}`}>
              {link}
            </Breadcrumb.Item>
          ))
        ) : (
          <Breadcrumb.Item active href={`/${links.split(" ").join("-")}`}>
            {links}
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
    </section>
  );
}
