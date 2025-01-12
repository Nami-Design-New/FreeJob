import { BsChat } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router";
import ProjectDetailsComponent from "../ui/projects/ProjectDetailsComponent";
import ProjectOwner from "../ui/projects/ProjectOwner";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import ServiceRating from "../ui/servicesComponents/serviceDetails/ServiceRating";
import AddOffer from "../ui/projects/AddOffer";
const offers = [
  {
    id: "1",
    name: "Programming /Desktop",

    description:
      "Guinrank tool has recently proven its superiority as the best SEO tool for writing articles with artificial intelligence. We all know that content is the basis of leadership.",
    user: {
      name: "Mahmod Ahmed",
      date: 3 - 10 - 2024,
      rate: "3",
      imageUrl: "https://placehold.co/58",
    },
  },
  {
    id: "2",
    name: "Programming /Desktop",

    description:
      "Guinrank tool has recently proven its superiority as the best SEO tool for writing articles with artificial intelligence. We all know that content is the basis of leadership.",
    user: {
      name: "Mahmod Ahmed",
      date: 3 - 10 - 2024,
      rate: "3",
      imageUrl: "https://placehold.co/58",
    },
  },
  {
    id: "3",
    name: "Programming /Desktop",

    description:
      "Guinrank tool has recently proven its superiority as the best SEO tool for writing articles with artificial intelligence. We all know that content is the basis of leadership.",
    user: {
      name: "Mahmod Ahmed",
      date: 3 - 10 - 2024,
      rate: "3",
      imageUrl: "https://placehold.co/58",
    },
  },
  {
    id: "4",
    name: "Programming /Desktop",

    description:
      "Guinrank tool has recently proven its superiority as the best SEO tool for writing articles with artificial intelligence. We all know that content is the basis of leadership.",
    user: {
      name: "Mahmod Ahmed",
      date: 3 - 10 - 2024,
      rate: "3",
      imageUrl: "https://placehold.co/58",
    },
  },
];
const ProjectDetails = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const segments = pathname
    .split("/")
    .filter((segment) => segment === "projects");

  return (
    <section>
      <section className="project_header_container ">
        <section className="container-md ">
          <DetailsHeader links={segments} />
          <p>ProjectName</p>
        </section>
      </section>

      <section className="container">
        <section className="row">
          <section className="col-lg-9">
            <ProjectDetailsComponent />
            <AddOffer />
          </section>
          <section className="col-lg-3">
            <ProjectOwner />
            <button
              onClick={() => navigate("/profile")}
              className="go_profile_btn"
            >
              Go to Profile
            </button>
          </section>
          <section className="row g-2  rating_container">
            <h6 className="header_rate d-flex align-items-center gap-3">
              <BsChat />
              Offers Made
            </h6>
            {offers.map((offer) => (
              <section key={offer.id} className="col-md-6 ">
                {<ServiceRating item={offer} />}
              </section>
            ))}
          </section>
        </section>
      </section>
    </section>
  );
};

export default ProjectDetails;
