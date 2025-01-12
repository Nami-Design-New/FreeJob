// import SectionHeader from "../ui/SectionHeader";
// import CollectionCard from "../ui/cards/CollectionCard";
// import EmptyData from "../ui/EmptyData";
// import DataLoader from "../ui/DataLoader";
// import { useTranslation } from "react-i18next";

import { useTranslation } from "react-i18next";
import CollectionCard from "../ui/cards/CollectionCard";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import { useLocation } from "react-router";

// import CustomPagination from "./../ui/CustomPagination";
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
  // const { data: collections, isLoading } = useCollectionsList();
  return (
    <>
      {/* <SectionHeader /> */}
      <section className="myCollections">
        <section className="header_container ">
          <section className="container-md">
            <DetailsHeader links={segments} />
          </section>
        </section>
        {/* {isLoading ? (
          <DataLoader />
        ) : ( */}
        <div className="container">
          <div className="row g-2">
            {
              collections && collections?.length > 0
                ? collections?.map((collection) => (
                    <CollectionCard
                      key={collection.id}
                      collection={collection}
                    />
                  ))
                : null // <EmptyData>{t("collectionsEmpty")}</EmptyData>
            }
            {/* {collections?.count > 10 && (
                // <CustomPagination count={collections?.count} pageSize={10} />
              )} */}
          </div>
        </div>
        {/* )} */}
      </section>
    </>
  );
};

export default MyCollections;
