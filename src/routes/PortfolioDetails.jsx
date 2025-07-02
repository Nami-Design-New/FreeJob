import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import { useTranslation } from "react-i18next";
import { useGetWork } from "../hooks/works/useGetWork";
import { useEffect, useState } from "react";
import { calculateDate } from "../utils/helper";
import { Link } from "react-router-dom";
import DataLoader from "../ui/DataLoader";
// const images = [
//   " https://placehold.co/400",
//   " https://placehold.co/500x400",
//   " https://placehold.co/100",
//   " https://placehold.co/200",
//   " https://placehold.co/700",
//   " https://placehold.co/300",
// ];

export default function PortfolioDetails() {
  const { t } = useTranslation();
  const { data, isLoading } = useGetWork();
  const [mainImage, setMainImage] = useState(null);
  const [isLoved, setIsLoved] = useState(false);

  function toggleLove() {
    setIsLoved(!isLoved);
  }

  useEffect(() => {
    if (data?.images?.length) {
      setMainImage(data.images[0].image);
    }
  }, [data]);
  function truncate(inputString) {
    let truncateStringResult;
    if (inputString?.length > 35) {
      truncateStringResult = inputString.substring(0, 35) + "...";
    } else {
      truncateStringResult = inputString;
    }
    return truncateStringResult;
  }
  return (
    <div>
      <section className="header_container ">
        <section className="container-md ">
          <DetailsHeader links={t("routes.portfolios")} />
        </section>
      </section>

      {isLoading ? (
        <DataLoader />
      ) : (
        <section className="container ">
          <section className="portfolio_details row">
            <section className="col-md-5">
              <section className="gallery-container ">

                <div className="main-image">
                  <img src={mainImage} alt="Main" />
                </div>
                <div className="thumbnail-container">

                  {data?.images.map((img) => (
                    <img
                      key={img.id}
                      src={img?.image}
                      alt={`Thumbnail ${img.id + 1}`}
                      className={`thumbnail ${mainImage === img?.image ? "active" : ""
                        }`}
                      onClick={() => setMainImage(img.image)}
                    />
                  ))}
                </div>
              </section>
            </section>
            <section className="about mt-3 mt-md-0 col-md-7">
              <h6> <button
                className={`likes like-btn ${isLoved ? "active" : ""}`}
                onClick={toggleLove}
              >
              <i className="fa-solid fa-thumbs-up"></i>
              </button> {data?.title}  </h6>
              <p>{data?.description}</p>
              <section className="likes-wrap">


              </section>

              <section className="info">
                {" "}
                <div className="info-item">
                  <i className="fa-solid fa-clipboard"></i>
                  <Link
                    target="_blank"
                    to={data?.link}
                    className="m-0 item-value"
                  >
                    {truncate(data?.link)}
                  </Link>
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-calendar-days"></i>
                  {calculateDate(data?.start_date)}
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-calendar-days"></i>
                  {calculateDate(data?.end_date)}
                </div>
              </section>
              <section className="likes-views">
                <section className="likes-wrap">
                  <div className="likes">
                    <i className="fa-solid fa-thumbs-up"></i>

                    <span>{data?.likes_count}</span>
                  </div>
                  <div>{t("like")}</div>
                </section>
                <section className="likes-wrap">
                  <div className="likes">
                    {" "}
                    <i className="fa-solid fa-eye"></i>
                    <span>{data?.view_count}</span>
                  </div>
                  <div>{t("view")}</div>
                </section>
              </section>
            </section>
          </section>
        </section>
      )}
    </div>
  );
}
