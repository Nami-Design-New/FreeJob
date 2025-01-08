import { useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import PaginationComponent from "../ui/PaginationComponent";
import SectionCard from "../ui/cards/SectionCard";
import ChooseCategoryPath from "../ui/modals/ChooseCategoryPath";
const sections = [
  {
    id: "1",
    title: "Website Development",
    backgroundColor: "#00732E",
    imageUrl: "https://placehold.co/188",
    subCategories: [
      { id: "1", name: "Frontend Development" },
      { id: "2", name: "Backend Development" },
      { id: "3", name: "Full Stack Development" },
    ],
  },
  {
    id: "2",
    title: "Logo Design",
    backgroundColor: "#FF7640",
    imageUrl: "https://placehold.co/188",
    subCategories: [
      { id: "1", name: "Minimalist Logo" },
      { id: "2", name: "Custom Logo" },
      { id: "3", name: "Corporate Logo" },
    ],
  },
  {
    id: "3",
    title: "SEO",
    backgroundColor: "#003912",
    imageUrl: "https://placehold.co/188",
    subCategories: [
      { id: "1", name: "On-Page SEO" },
      { id: "2", name: "Off-Page SEO" },
      { id: "3", name: "Technical SEO" },
    ],
  },
  {
    id: "4",
    title: "Architecture & Interior Design",
    backgroundColor: "#4D1727",
    imageUrl: "https://placehold.co/188",
    subCategories: [
      { id: "1", name: "Residential Design" },
      { id: "2", name: "Commercial Design" },
      { id: "3", name: "Landscape Design" },
    ],
  },
  {
    id: "5",
    title: "Social Media Marketing",
    backgroundColor: "#687200",
    imageUrl: "https://placehold.co/188",
    subCategories: [
      { id: "1", name: "Content Creation" },
      { id: "2", name: "Ad Campaigns" },
      { id: "3", name: "Influencer Marketing" },
    ],
  },
  {
    id: "6",
    title: "Voice Over",
    backgroundColor: "#421300",
    imageUrl: "https://placehold.co/188",
    subCategories: [
      { id: "1", name: "Narration" },
      { id: "2", name: "Commercial Voice Over" },
      { id: "3", name: "Character Voice Over" },
    ],
  },
  {
    id: "7",
    title: "Logo Design",
    backgroundColor: "#FF7640",
    imageUrl: "https://placehold.co/188",
    subCategories: [
      { id: "1", name: "Custom Logo" },
      { id: "2", name: "3D Logo" },
      { id: "3", name: "Animated Logo" },
    ],
  },
  {
    id: "8",
    title: "Logo Design",
    backgroundColor: "#421300",
    imageUrl: "https://placehold.co/188",
    subCategories: [
      { id: "1", name: "Vintage Logo" },
      { id: "2", name: "Modern Logo" },
      { id: "3", name: "Typography Logo" },
    ],
  },
  {
    id: "9",
    title: "Logo Design",
    backgroundColor: "#FF7640",
    imageUrl: "https://placehold.co/188",
    subCategories: [
      { id: "1", name: "Abstract Logo" },
      { id: "2", name: "Emblem Logo" },
      { id: "3", name: "Geometric Logo" },
    ],
  },
];

export default function Sections() {
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSections = sections.slice(startIndex, startIndex + itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCloseModal = () => setShow(false);
  const handleOpenModal = () => setShow(true);
  return (
    <div className="sections">
      <div className="sections_breadcrumb">
        <div className="container">
          <Breadcrumb as="nav">
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Sections</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="container">
        {
          <div className="row mt-5">
            {currentSections.map((section) => (
              <div
                key={section.id}
                onClick={handleOpenModal}
                className="col-sm-6 col-md-4 col-lg-3 col-xl-2 g-3 section_link"
              >
                <SectionCard
                  backgroundColor={section.backgroundColor}
                  section={section}
                />
              </div>
            ))}
          </div>
        }
      </div>
      <div className="mt-5 d-flex align-items-center justify-content-center">
        <PaginationComponent
          totalItems={sections.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      <ChooseCategoryPath show={show} close={handleCloseModal} />
    </div>
  );
}
