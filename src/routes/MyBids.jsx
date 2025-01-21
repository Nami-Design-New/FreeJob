import { useTranslation } from "react-i18next";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";
import BidCard from "../ui/cards/BidCard";
import SortFilterBox from "../ui/SortFilterBox";
import useGetMyProjectRequestsList from "../hooks/projects/useGetMyProjectRequestsList";

export default function MyBids() {
  const { t } = useTranslation();
  const { isLoading, data: bids } = useGetMyProjectRequestsList();

  return (
    <>
      <section className="header_container ">
        <section className="container-md ">
          <DetailsHeader links={t("routes.bids")} />
        </section>
      </section>
      {isLoading ? (
        <DataLoader />
      ) : (
        <section className="best-freelancers search-section">
          <div className="container">
            <div className="row">
              <>
                <SortFilterBox  type="bids" />
                {bids?.length > 0 ? (
                  bids.map((bid) => (
                    <div className="col-12 p-2" key={bid?.id}>
                      <BidCard bid={bid} />
                    </div>
                  ))
                ) : (
                  <EmptyData>{t("search.noData")}</EmptyData>
                )}
              </>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
