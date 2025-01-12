import { useTranslation } from "react-i18next";
import CollectionCard from "../ui/cards/CollectionCard";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import { useLocation } from "react-router";

const collections = [
  { id: 1, title: "Sample Collection", created_at: new Date().toISOString() },
  { id: 2, title: "Sample Collection", created_at: new Date().toISOString() },
  { id: 3, title: "Sample Collection", created_at: new Date().toISOString() },
  { id: 4, title: "Sample Collection", created_at: new Date().toISOString() },
];

const MyCollections = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const segments = pathname
    .split("/")
    .filter((segment) => segment === "my-collections")[0]
    .split("-")
    .join(" ");
  return (
    <>
      <section className="myCollections">
        <section className="collections_header_container ">
          <section className="container-md">
            <DetailsHeader links={segments} />
          </section>
        </section>

        <div className="container">
          <div className="row g-2">
            {collections && collections?.length > 0
              ? collections?.map((collection) => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))
              : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyCollections;
