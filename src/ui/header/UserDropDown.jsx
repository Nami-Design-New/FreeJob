import { Dropdown } from "react-bootstrap";
import {
  BsBell,
  BsBoxArrowRight,
  BsChatSquareText,
  BsSearch,
} from "react-icons/bs";

export default function UserDropDown() {
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
        <Dropdown.Item>
          <BsSearch className="me-2" /> Search
        </Dropdown.Item>
        <Dropdown.Item>
          <BsBoxArrowRight className="me-2" /> Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
