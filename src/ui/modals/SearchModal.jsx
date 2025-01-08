import { Modal } from "react-bootstrap";
import SearchBox from "../header/SearchBox";

export default function SearchModal({ onHide, show }) {
  return (
    <Modal
      onHide={onHide}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {" "}
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Search</Modal.Title>
        <button
          onClick={onHide}
          className="btn-close"
          aria-label="Close"
        ></button>
      </Modal.Header>
      <Modal.Body className="mt-5" style={{ height: "300px" }}>
        <SearchBox closeModal={onHide} placeholder="Search For Projects" />
      </Modal.Body>
    </Modal>
  );
}
