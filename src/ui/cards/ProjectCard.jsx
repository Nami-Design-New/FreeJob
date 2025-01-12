import { FaFile, FaUsers } from "react-icons/fa";

export default function ProjectCard({ project }) {
  const {
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
      <section className="project_owner">
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
      </section>
    </section>
  );
}
