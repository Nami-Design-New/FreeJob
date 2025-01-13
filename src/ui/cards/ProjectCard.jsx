import { FaFile, FaUsers } from "react-icons/fa";
import { Link } from "react-router";

export default function ProjectCard({ project }) {
  const {
    id,
    name: projecteName,
    description,
    owner: { imageUrl: ownerImage, name: username, offers },
  } = project;

  return (
    <section className="project_card">
      <section className="project_content">
        <h1>{projecteName}</h1>
        <p>{description}</p>
      </section>
      <Link to={"profiles/" + id} className="project_owner gap-3">
        <section className="image_user_container">
          <img src={ownerImage} />
        </section>
        <section className="project_owner_info">
          <h4>{username}</h4>
          <section className="stats d-flex gap-1 ">
            <section className="gap-1  d-flex align-items-center justify-content-center">
              <FaFile />
              <span>3 months and 20 days ago</span>
            </section>
            <section className="gap-1 d-flex align-items-center justify-content-center">
              <FaUsers />
              <span>{offers}</span>
              Offers
            </section>
          </section>
        </section>
      </Link>
    </section>
  );
}
