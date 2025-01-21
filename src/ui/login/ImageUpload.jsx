import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaEdit } from "react-icons/fa";

const ImageUpload = ({ formData, setFormData, image }) => {
  const { t } = useTranslation();
  const imgView = useRef(null);

  useEffect(() => {
    if (image) {
      imgView.current.src = image;
    }
  }, [image]);

  const handleUpload = (e) => {
    imgView.current.src = URL.createObjectURL(e.target.files[0]);
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };
  return (
    <section className="image-change-wrapper">
      <label className="upload">
        <section className="img-wrap">
          <img ref={imgView} src="/images/avatar.jpg" alt="avatar" />
        </section>
        <section className="plus">
          <FaEdit />
        </section>
        <input
          type="file"
          name="image"
          id="img-upload"
          accept="image/*"
          onChange={handleUpload}
        />
      </label>
    </section>
  );
};
export default ImageUpload;
