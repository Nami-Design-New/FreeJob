import { Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import OwnerComponent from "../servicesComponents/serviceDetails/OwnerComponent";

export default function ServiseOwner() {
  return (
    <section className="service_card_owner">
      <OwnerComponent />
      <ul className="card_ul">
        <li className="rate d-flex justify-content-between">
          <p>Project State</p>
          <Badge bg="success" p>
            New
          </Badge>
        </li>
        <li className="rate d-flex justify-content-between">
          <p>Puplish Date</p>3 jan
        </li>
        <li className="d-flex justify-content-between">
          <p>Budget</p>
          <span>200$</span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>Execution Time</p>
          <span>12 days</span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>Average Offers</p>
          <span>$25400</span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>Number of Offers</p>
          <span>3</span>
        </li>
      </ul>
    </section>
  );
}
