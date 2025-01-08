import React from "react";
import ProjectCard from "../cards/ProjectCard";
import SectionHeader from "../SectionHeader";

const popularProjects = [
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

export default function PopularProjects() {
  return (
    <div className="popular_projects">
      <SectionHeader
        title="Most Popular Projects"
        description="Most viewed and best selling projects ever"
      />
      <div className="row mt-5">
        {popularProjects.map((project) => (
          <div key={project.id} className="  col-md-6 ">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
