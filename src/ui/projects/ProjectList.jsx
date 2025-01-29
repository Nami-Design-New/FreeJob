import { useTranslation } from "react-i18next";
import useProjectsList from "../../hooks/projects/useProjectsList";
import ProjectCard from "../cards/ProjectCard";
import CustomPagination from "../CustomPagination";
import DataLoader from "../DataLoader";
import EmptyData from "../EmptyData";

export default function ProjectList() {
  const { t } = useTranslation();
  const { data: searchProjectsList, isLoading } = useProjectsList();

  return isLoading ? (
    <DataLoader />
  ) : (
    <>
      {console.log(searchProjectsList)}
      {searchProjectsList && searchProjectsList?.data.length > 0 ? (
        <section className="row g-3">
          {searchProjectsList?.data.map((project) => (
            <div key={project.id} className="projects_card_filter">
              <section className="col-12">
                <ProjectCard isProfile={false} project={project} />
              </section>
            </div>
          ))}
          {searchProjectsList && searchProjectsList?.total > 10 && (
            <CustomPagination count={searchProjectsList?.total} pageSize={10} />
          )}
        </section>
      ) : (
        <EmptyData minHeight={"300px"}>
          {t("notFoundPlaceholder.noProjectsFoundWithThisDetails")}
        </EmptyData>
      )}
    </>
  );
}
