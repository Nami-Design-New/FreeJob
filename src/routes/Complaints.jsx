import  { useState } from "react";
import { useTranslation } from "react-i18next";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import { Link, useLocation } from "react-router";
import FormInput from "../ui/form/FormInput";
import FormTextArea from "../ui/form/FormTextArea";
import SubmitButton from "../ui/form/SubmitButton";
import { IoIosCloseCircle } from "react-icons/io";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axios";
import FormSelector from "../ui/form/FormSelector";

const Complaints = () => {
  const { pathname } = useLocation();

  const segments = pathname
    .split("/")
    .filter((segment) => segment === "Report aproblem");

  const pageTitle =
    segments.length > 0 ? segments[0].split("-").join(" ") : "Report aproblem";
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "",
    images: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAttachments = (e) => {
    const filesArray = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...filesArray],
    }));
  };

  const removeFile = (index, file) => {
    setFormData((prevState) => {
      const updatedFiles = prevState.images.filter((_, i) => i !== index);
      const updatedDeleteFiles = file.id
        ? [...prevState.delete_files, file.id]
        : prevState.delete_files;
      return {
        ...prevState,
        images: updatedFiles,
        delete_files: updatedDeleteFiles,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/user/create_complaint",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.code == 200) {
        toast.success(t("complaints.complaintSentSuccessfully"));
        setFormData({
          title: "",
          message: "",
          type: "",
          images: [],
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.data.messege);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="complaints-page">
      <section className="collections_header_container mb-4">
        <div className="container-md">
          <DetailsHeader links={pageTitle} />
        </div>
      </section>

      <section className="container my-5">
        {/* Header */}
        <div className="text-center mb-4">
          <img
            src="./images/support.png"
            alt="hed-img"
            className="mb-3"
            style={{ maxWidth: "180px" }}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className=" p-4 rounded">
          <div className="row mb-3 ">
            <div className="col-md-6">
              <FormInput
                label={t("complaints.title")}
                id="title"
                name="title"
                onChange={handleChange}
                value={formData.title}
                required
                placeholder={t("writeHere")}
              />
            </div>
            <div className="col-md-6">
              {" "}
              <FormSelector
                id="type"
                name="type"
                onChange={handleChange}
                value={formData.type}
                required
                label={t("complaints.type")}
                disabledOption={t("complaints.choose")}
                options={[
                  {
                    name: t("complaints.type1"),
                    value: "complaint",
                  },
                  {
                    name: t("complaints.type2"),
                    value: "suggestion",
                  },
                ]}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label mb-3">{t("Message")}</label>
            <FormTextArea
              rows={5}
              label={t("complaints.message")}
              id="message"
              name="message"
              onChange={handleChange}
              value={formData.message}
              placeholder={t("writeHere")}
            />
          </div>

          <section className="col-12 p-2 ">
            <section className="content">
              <h6>Add Project Attachments</h6>
            </section>
          </section>
          <section className="file_upload_grid mb-3">
            <label className="upload_attachments">
              <input
                type="file"
                name="project_files"
                id="project_files"
                multiple
                onChange={handleAttachments}
              />
              <section className="icon">
                <img src="./images/imageUpload.png" alt="icon" />
              </section>
            </label>
            {formData?.images?.length > 0 && (
              <section className="col-12 p-2">
                <section className="attachments">
                  {formData?.images?.map((file, index) => (
                    <section className="attachment" key={index}>
                      <section className="d-flex align-items-center gap-3">
                        <section className="icon-file">
                          <img
                            src={
                              file?.type?.startsWith("image/")
                                ? URL.createObjectURL(file)
                                : "./icons/doc.svg"
                            }
                            alt="icon"
                          />
                        </section>
                        <section className="content">
                          <h6>
                            {file?.file ? (
                              <Link target="_blank" to={file?.file}>
                                {file?.file}
                              </Link>
                            ) : (
                              file?.name
                            )}
                          </h6>
                          <p>
                            {file?.file_size
                              ? file?.file_size?.toFixed(2)
                              : (file.size / 1024).toFixed(2)}{" "}
                            MB
                          </p>
                        </section>
                      </section>
                      <button
                        className="delete"
                        onClick={() => removeFile(index, file)}
                      >
                        <IoIosCloseCircle />
                      </button>
                    </section>
                  ))}
                </section>
              </section>
            )}
          </section>

          <SubmitButton
            className="order-now"
            loading={loading}
            name={t("complaints.submit")}
          />
        </form>
      </section>
    </section>
  );
};

export default Complaints;
