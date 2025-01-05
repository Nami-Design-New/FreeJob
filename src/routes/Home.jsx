import Search from "../ui/Home/Search";
import CategoriesSwiper from "../ui/Home/CategoriesSwiper";
import SectionsSwiper from "../ui/Home/SectionsSwiper";

export default function Home() {
  return (
    <>
      <div className="first_section">
        <Search />
        <CategoriesSwiper />
      </div>
      <div>
        <SectionsSwiper />{" "}
      </div>
    </>
  );
}
