import { useTranslation } from "react-i18next";
import { LiaFileSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router";
import { TiAttachment } from "react-icons/ti";
import { truncateText } from "../../utils/helper";
const files = [
  {
    image: ".images/image.png",
    size: "1121 Mb",
    name: "jpg",
  },
  {
    image: ".images/image.png",
    size: "1121 Mb",
    name: "jpg",
  },
  {
    image: ".images/image.png",
    size: "1121 Mb",
    name: "jpg",
  },
  {
    image: ".images/image.png",
    size: "1121 Mb",
    name: "jpg",
  },
];
export default function ServiseDetailsComponent({ project }) {
  let islogged = true;
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="project_details_component">
      <section className="project_description">
        <h6>
          <LiaFileSolid />
          {t("projects.projectDetails")}
        </h6>
        <p>{project.description}</p>
        {project?.files?.length > 0 && (
          <>
            <h6>
              <TiAttachment />
              {t("projects.attachments")}
            </h6>
            <section className="file_container">
              {project?.files.map((file) => (
                <div key={file?.file} className="file_card">
                  <i className="fa-regular fa-file"></i>
                  {/* <img src={`/images/${file?.file}`} alt={file.name} /> */}
                  <section className="img_info">
                    <Link target="_blank" to={file?.file}>
                      <p>{truncateText(file?.file_path, 30)}</p>
                    </Link>
                    {/* <p>{file?.file_size}</p> */}
                  </section>
                </div>
              ))}
            </section>
          </>
        )}
      </section>

      <section></section>
    </section>
  );
}
