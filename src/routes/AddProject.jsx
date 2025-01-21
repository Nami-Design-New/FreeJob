import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosCloseCircle } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { createProject, editProject } from "../services/apiProjects";
import { useQueryClient } from "@tanstack/react-query";
import useCategorieListWithSub from "../hooks/categories/useCategorieListWithSub";
import useGetProject from "../hooks/projects/useGetProject";
import FormButton from "../ui/form/FormButton";
import FormInput from "../ui/form/FormInput";
import FormSelector from "../ui/form/FormSelector";
import FormTextArea from "../ui/form/FormTextArea";
import MultiSelect from "../ui/form/MaltiSelect";
import ErrorPage from "./ErrorPage";
import useGetSkills from "../hooks/settings/useGetSkills";

export default function AddProject() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const { data: categories } = useCategorieListWithSub();
  const { data: projectDetails, isLoading } = useGetProject();
  const { data: skills } = useGetSkills();
  const [formData, setFormData] = useState({
    title: "",
    sub_category_id: "",
    price: "",
    days: "",
    description: "",
    project_files: [],
    delete_files: [],
    skills: [],
  });
  useEffect(() => {
    if (projectDetails) {
      setCategoryId(projectDetails?.category?.id);
      const initialData = {
        id: projectDetails?.id,
        title: projectDetails?.title,
        sub_category_id: projectDetails?.sub_category_id,
        price: projectDetails?.price,
        days: projectDetails?.days,
        skills: projectDetails?.skills?.map((skill) => skill?.id) || [],
        description: projectDetails?.description,
        project_files: projectDetails?.files,
        delete_files: [],
      };
      setFormData(initialData);
    }
  }, [projectDetails]);

  useEffect(() => {
    if (formData.skills?.length > 0) {
      const selectedOptions = formData.skills?.map((skillId) => {
        const option = skills?.find((opt) => opt.id === skillId);
        return {
          value: option?.id,
          label: option?.name,
        };
      });
      setSelectedOptions(selectedOptions);
    }
  }, [formData.skills, skills]);

  useEffect(() => {
    if (categoryId) {
      setSubCategories(
        categories?.find(
          (category) => Number(category.id) === Number(categoryId)
        )?.sub_categories
      );
    }
  }, [categoryId, categories]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (selectedItems) => {
    setSelectedOptions(selectedItems);
    const selectedValues = selectedItems
      ? selectedItems?.map((option) => option.value)
      : [];
    setFormData({
      ...formData,
      skills: selectedValues,
    });
  };

  const handleAttachments = (e) => {
    const filesArray = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      project_files: [...prev.project_files, ...filesArray],
    }));
  };

  const removeFile = (index, file) => {
    setFormData((prevState) => {
      const updatedFiles = prevState.project_files.filter(
        (_, i) => i !== index
      );
      const updatedDeleteFiles = file.id
        ? [...prevState.delete_files, file.id]
        : prevState.delete_files;
      return {
        ...prevState,
        project_files: updatedFiles,
        delete_files: updatedDeleteFiles,
      };
    });
  };

  const dataToSendForUpdate = {
    ...formData,
    project_files: formData.project_files.filter((file) =>
      file?.type?.startsWith("image/")
    ),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await editProject(dataToSendForUpdate, queryClient);
        toast.success(t("projects.projectEditedSuccessfully"));
      } else {
        await createProject(formData, queryClient);
        toast.success(t("projects.projectCreatedSuccessfully"));
      }
      navigate("/profile");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (id && !isLoading && !projectDetails) {
    return <ErrorPage />;
  }

  return (
    <section>
      <section className=" col-lg-8 container my-5">
        <form className="form" onSubmit={handleSubmit}>
          <section className="row m-0">
            <section className="col-12 p-2">
              <FormInput
                label={t("projects.projectTitle")}
                id="title"
                name="title"
                onChange={handleChange}
                value={formData.title}
                required
                placeholder={t("writeHere")}
              />
            </section>
            <section className="col-lg-6 col-12 p-2">
              <FormInput
                label={t("projects.price")}
                id="price"
                name="price"
                type="number"
                min={1}
                value={formData.price}
                onChange={handleChange}
                required
                span={"$"}
              />
            </section>
            <section className="col-lg-6 col-12 p-2">
              <FormInput
                label={t("projects.deliveryTime")}
                id="days"
                name="days"
                type="number"
                min={1}
                required
                value={formData.days}
                onChange={handleChange}
                span={t("projects.days")}
              />
            </section>
            <section className="col-lg-6 col-12 p-2">
              <FormSelector
                label={t("addService.serviceCategory")}
                id="category"
                name="category"
                disabledOption={t("select")}
                value={categoryId}
                onChange={(e) => {
                  setSubCategories(
                    categories?.find(
                      (category) =>
                        Number(category.id) === Number(e.target.value)
                    )?.sub_categories
                  );
                  setCategoryId(e.target.value);
                }}
                options={categories?.map((category) => ({
                  name: category.name,
                  value: category.id,
                }))}
              />
            </section>
            <section className="col-lg-6 col-12 p-2">
              <FormSelector
                label={t("addService.serviceSubCategory")}
                id="sub_category_id"
                name="sub_category_id"
                value={formData.sub_category_id}
                onChange={handleChange}
                options={subCategories?.map((subCategory) => ({
                  name: subCategory.name,
                  value: subCategory.id,
                }))}
                disabledOption={
                  categoryId ? t("select") : t("addService.selectCategoryFirst")
                }
              />
            </section>
            <section className="col-12 p-2">
              <FormTextArea
                label={t("projects.projectDescription")}
                required
                id="description"
                name="description"
                onChange={handleChange}
                value={formData.description}
                placeholder={t("writeHere")}
              />
            </section>
            <section className="col-12 p-2">
              <MultiSelect
                label={t("search.skills")}
                id="skills"
                name="skills"
                selectedOptions={selectedOptions}
                handleChange={handleSelect}
                options={skills?.map((skill) => ({
                  label: skill?.name,
                  value: skill?.id,
                }))}
              />
            </section>

            <section className="col-12 p-2">
              <section className="content">
                <h6>Add Project Attachments</h6>
              </section>
            </section>
            <section className="file_upload_grid">
              <label className="upload_attachments">
                <input
                  type="file"
                  name="project_files"
                  id="project_files"
                  multiple
                  onChange={handleAttachments}
                />
                <section className="icon">
                  <img src="/images/imageUpload.png" alt="icon" />
                </section>
              </label>
              {formData?.project_files?.length > 0 && (
                <section className="col-12 p-2">
                  <section className="attachments">
                    {formData?.project_files?.map((file, index) => (
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
          </section>
          <section className="col-12 p-2 d-flex justify-content-end">
            <FormButton
              loading={loading}
              content={id ? t("projects.update") : t("projects.publish")}
              type="submit"
            />
          </section>
        </form>
      </section>
    </section>
  );
}
