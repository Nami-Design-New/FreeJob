import { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

const ImageUpload = ({ name = "image", label, image, error, onChange }) => {
  const imgView = useRef(null);

  useEffect(() => {
    if (image && imgView.current) {
      const url =
        typeof image === "string" ? image : URL.createObjectURL(image);
      imgView.current.src = url;
    }
  }, [image]);

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (file && imgView.current) {
      imgView.current.src = URL.createObjectURL(file);
    }

    if (onChange) onChange(e);
  };

  return (
    <section className="image-change-wrapper">
      {label && <label className="mb-2">{label}</label>}
      <div>
        <label className="upload">
          <section className="img-wrap">
            <img ref={imgView} src="/images/avatar.jpg" alt="avatar" />
          </section>
          <section className="plus">
            <FaEdit />
          </section>

          <Form.Control
            type="file"
            name={name}
            accept="image/*"
            onChange={handleUpload}
            isInvalid={!!error}
          />
        </label>
      </div>
      {error && (
        <Form.Control.Feedback type="invalid" className="d-block">
          {error}
        </Form.Control.Feedback>
      )}
    </section>
  );
};
export default ImageUpload;
