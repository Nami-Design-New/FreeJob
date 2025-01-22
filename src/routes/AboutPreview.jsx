import DataLoader from "../ui/DataLoader";
import ErrorPage from "./ErrorPage";
import useGetAboutData from "../hooks/about/useGetAboutData";

const AboutPreview = () => {
  const { data, isLoading } = useGetAboutData();
  const renderHTML = (htmlContent) => {
    return { __html: htmlContent };
  };
  if (isLoading) {
    <DataLoader />;
  }
  if (!isLoading && !data) {
    return <ErrorPage />;
  }
  return (
    <section className="faqs">
      <div className="container">
        <div dangerouslySetInnerHTML={renderHTML(data?.html)} />
      </div>
    </section>
  );
};

export default AboutPreview;
