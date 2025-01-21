import { useTranslation } from "react-i18next";
import useCollectionsList from "../hooks/collections/useCollectionsList";
import CollectionCard from "../ui/cards/CollectionCard";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";

const MyCollections = () => {
  const { data: collections, isLoading } = useCollectionsList();
  const { t } = useTranslation();
  return (
    <>
      <section className="myCollections">
        <section className="collections_header_container ">
          <section className="container-md">
            <DetailsHeader links={"My Collections"} />
          </section>
        </section>

        {isLoading ? (
          <DataLoader />
        ) : (
          <div className="container">
            <div className="row g-2">
              {collections && collections?.length > 0 ? (
                collections?.map((collection) => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))
              ) : (
                <EmptyData>{t("collectionsEmpty")}</EmptyData>
              )}{" "}
              {/* {collections?.total > 10 && (
                <PaginationComponent totalItems={collections.total} />
              )} */}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default MyCollections;
