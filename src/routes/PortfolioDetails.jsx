import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import { useTranslation } from "react-i18next";
import { useGetWork } from "../hooks/works/useGetWork";
import { useState } from "react";
import { calculateDate } from "../utils/helper";
import { Link } from "react-router-dom";
const images = [
  " https://placehold.co/400",
  " https://placehold.co/500x400",
  " https://placehold.co/100",
  " https://placehold.co/200",
  " https://placehold.co/700",
  " https://placehold.co/300",
];

export default function PortfolioDetails() {
  const { t } = useTranslation();
  const { data, isLoading } = useGetWork();
  const [mainImage, setMainImage] = useState(images[0]);
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

      <section className="container ">
        <section className="portfolio_details row">
          <section className="col-md-5">
            <section className="gallery-container ">
              <div className="main-image">
                <img src={mainImage} alt="Main" />
              </div>
              <div className="thumbnail-container">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className={`thumbnail ${mainImage === img ? "active" : ""}`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            </section>
          </section>
          <section className="about mt-3 mt-md-0 col-md-7">
            <h6>شركه yeenud</h6>
            <p>
              عزيزي العميل: إذا كنت تحتاج إلى التصاميم المميزة فإليك عرضي..
              ستحصل على تصميم صورة واحدة (عدد 1) من القائمة التالية: - صور لموقع
              الويب الخاص بك - قصص فيس بوك وانستغرام - منشورات فيس بوك وانستغرام
              والعديد من الخدمات التي تخصّ تصميم الصور من بنرات وانفوجرافيك
              وعروض تقديمية. ميزات الخدمة: ستحصل مقابل الخدمة على: - تصاميم
              فريدة عالية الجودة. - تصميم باللغة التي تختارها. - تسليم العمل
              بصيغة JPG أو PNG - أتقبل انتقادك بصدر رحب. - أضمن لك إنجاز العمل
              بأسرع وقت ممكن وأفضل جودة. *** ملاحظات يرجى التركيز عليها - يتم
              تعديل التصميم مرة واحدة فقط - التصميم باستخدام برنامج كانفا
            </p>
            <section className="info">
              {" "}
              <div className="info-item">
                <i className="fa-solid fa-clipboard"></i>
                <Link
                  target="_blank"
                  to={data?.link}
                  className="m-0 item-value"
                >
                  www.asd.com
                  {/* {truncate(data?.link)} */}
                </Link>
              </div>
              <div className="info-item">
                <i className="fa-solid fa-calendar-days"></i>
                {/* {calculateDate(data?.start_date)} */}
                26 / 02 / 2024
              </div>
              <div className="info-item">
                <i className="fa-solid fa-calendar-days"></i>
                {/* {calculateDate(data?.end_date)} */}
                26 / 02 / 2024
              </div>
            </section>
            <section className="likes-views">
              <section className="likes-wrap">
                <div className="likes">
                  <i className="fa-solid fa-eye"></i>
                  <span>4</span>
                </div>
                <div>اعجاب</div>
              </section>
              <section className="likes-wrap">
                <div className="likes">
                  <i className="fa-solid fa-thumbs-up"></i>
                  <span>5</span>
                </div>
                <div>مشاهده</div>
              </section>
            </section>
          </section>
        </section>
      </section>
    </div>
  );
}
