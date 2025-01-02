import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import {
  BsBell,
  BsBoxArrowRight,
  BsChatSquareText,
  BsSearch,
} from "react-icons/bs";
import SearchModal from "../modals/SearchModal";

export default function UserDropDown() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Dropdown className="actions">
      <Dropdown.Toggle as="button" className="user_btn">
        <img src="https://placehold.co/48" alt="User Avatar" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>
          <BsChatSquareText className="me-2" /> Chat
        </Dropdown.Item>
        <Dropdown.Item>
          <BsBell className="me-2" /> Notifications
        </Dropdown.Item>
        <Dropdown.Item onClick={handleShow}>
          <BsSearch className="me-2" /> Search
        </Dropdown.Item>
        <SearchModal show={show} onHide={handleClose} />
        <Dropdown.Item>
          <BsBoxArrowRight className="me-2" /> Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
