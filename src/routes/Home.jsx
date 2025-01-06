import Banner from "../ui/Home/Banner";
import CategoriesSwiper from "../ui/Home/CategoriesSwiper";
import Gallery from "../ui/Home/Gallery";
import HowToStart from "../ui/Home/HowToStart";
import PartnersofSuccess from "../ui/Home/PartnersofSuccess";
import PopularProjects from "../ui/Home/PopularProjects";
import PopularServices from "../ui/Home/PopularServices";
import Promote from "../ui/Home/Promote";
import Search from "../ui/Home/Search";
import SectionsSwiper from "../ui/Home/SectionsSwiper";
import WorkWithUs from "../ui/Home/WorkWithUs";

export default function Home() {
  return (
    <>
      <div className="first_section">
        <Search />
        <CategoriesSwiper />
      </div>
      <div>
        <SectionsSwiper />
      </div>
      <div className="container">
        <div className="row">
          <HowToStart />
        </div>
        <PopularServices />
        <Promote />
        <PartnersofSuccess />
        <PopularProjects />
        <Gallery />
        <WorkWithUs />
      </div>
      <Banner />
    </>
  );
}
