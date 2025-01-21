import SectionHeader from "../SectionHeader";
import StepsToStartCard from "../cards/StepsToStartCard";
import { useTranslation } from "react-i18next";

const workWithUs = [
  {
    id: "1",
    title: "howItWorks.title1",
    description: "howItWorks.desc1",
    imageUrl: "/images/icon1.png",
  },
  {
    id: "2",
    title: "howItWorks.title2",
    description: "howItWorks.desc2",
    imageUrl: "/images/icon2.png",
  },
  {
    id: "3",
    title: "howItWorks.title3",
    description: "howItWorks.desc3",
    imageUrl: "/images/icon3.png",
  },
];
export default function WorkWithUs() {
  const { t } = useTranslation();

  return (
    <div className="work_with_us">
      <SectionHeader
        title={t("home.howItWorks")}
        description={t("home.howItWorksDesc")}
      />
      <div className="mt-5">
        <div className="row">
          {workWithUs.map((item) => (
            <div key={item.id} className="col-md-4 mt-5 ">
              <StepsToStartCard step={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
