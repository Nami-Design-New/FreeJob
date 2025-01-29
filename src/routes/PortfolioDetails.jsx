import React from "react";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import { useTranslation } from "react-i18next";
import { useGetWork } from "../hooks/works/useGetWork";

export default function PortfolioDetails() {
  const { t } = useTranslation();
  const { data, isLoading } = useGetWork();
  return (
    <div>
      <section className="header_container ">
        <section className="container-md ">
          <DetailsHeader links={t("routes.portfolios")} />
        </section>
      </section>

      <section className="container">
        <section className="gallarry col-5"></section>
        <section className="about col-7">
          <h6>شركه yeenud</h6>
          <p>
            عزيزي العميل: إذا كنت تحتاج إلى التصاميم المميزة فإليك عرضي.. ستحصل
            على تصميم صورة واحدة (عدد 1) من القائمة التالية: - صور لموقع الويب
            الخاص بك - قصص فيس بوك وانستغرام - منشورات فيس بوك وانستغرام والعديد
            من الخدمات التي تخصّ تصميم الصور من بنرات وانفوجرافيك وعروض تقديمية.
            ميزات الخدمة: ستحصل مقابل الخدمة على: - تصاميم فريدة عالية الجودة. -
            تصميم باللغة التي تختارها. - تسليم العمل بصيغة JPG أو PNG - أتقبل
            انتقادك بصدر رحب. - أضمن لك إنجاز العمل بأسرع وقت ممكن وأفضل جودة.
            *** ملاحظات يرجى التركيز عليها - يتم تعديل التصميم مرة واحدة فقط -
            التصميم باستخدام برنامج كانفا
          </p>
          <section>
            <span>www.asd.com</span>
            <span>26 / 02 / 2024</span>
          </section>
          <section>
            <section>
              <span>4</span>
              <span>اعجاب</span>
            </section>
            <section>
              <span>5</span>
              <span>مشاهده</span>
            </section>
          </section>
        </section>
      </section>
    </div>
  );
}
