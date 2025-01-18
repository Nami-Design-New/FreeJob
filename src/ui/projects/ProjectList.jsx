import { Link } from "react-router";
import ProjectCard from "../cards/ProjectCard";
import useProjectsList from "../../hooks/projects/useProjectsList";
import EmptyData from "../EmptyData";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import DataLoader from "../DataLoader";

export default function ProjectList() {
  const { t } = useTranslation();
  const {
    data: searchProjectsList,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useProjectsList();
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        if (!isFetchingNextPage && hasNextPage) {
          fetchNextPage();
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingNextPage, hasNextPage, fetchNextPage, searchProjectsList]);
  return isFetching ? (
    <DataLoader />
  ) : (
    <>
      {searchProjectsList && searchProjectsList?.length > 0 ? (
        <main className="row g-3">
          {searchProjectsList.map((project) => (
            <div key={project.id} className="projects_card_filter">
              <section className="col-12">
                <ProjectCard project={project} />
              </section>
            </div>
          ))}
          {isFetching && <DataLoader />}
        </main>
      ) : (
        <EmptyData minHeight={"300px"}>
          {t("notFoundPlaceholder.noProjectsFoundWithThisDetails")}
        </EmptyData>
      )}
    </>
  );
}
