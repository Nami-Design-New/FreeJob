import { Link } from "react-router";
import ProjectCard from "../cards/ProjectCard";
const projects = [
  {
    id: "1",
    name: "10 second 3D video designer wanted",
    description:
      "Guinrank tool has recently proven its superiority as the best SEO tool for writing articles with artificial intelligence. We all know that content is the basis of leadership.",
    owner: {
      imageUrl: "https://placehold.co/48",
      name: "Ahmed Mohamed",
      servicesNo: "2",
      clients: "2",
      offers: "2",
    },
  },
  {
    id: "2",
    name: "10 second 3D video designer wanted",
    description:
      "Guinrank tool has recently proven its superiority as the best SEO tool for writing articles with artificial intelligence. We all know that content is the basis of leadership.",
    owner: {
      imageUrl: "https://placehold.co/48",
      name: "Ahmed Mohamed",
      servicesNo: "2",
      clients: "2",
      offers: "2",
    },
  },
];
export default function ProjectList() {
  return (
    <>
      {projects.map((project) => (
        <section key={project.id} className="projects_card_filter">
          <Link to={project.id}>
            <ProjectCard project={project} />
          </Link>
        </section>
      ))}
    </>
  );
}
