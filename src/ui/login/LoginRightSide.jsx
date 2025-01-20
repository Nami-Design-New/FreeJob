import { FaCheck } from "react-icons/fa";

export default function LoginRightSide() {
  return (
    <div className="right_side">
      <h6>The largest platform for freelancers </h6>
      <ul>
        <li>
          <FaCheck />
          <p>700 categories</p>
        </li>
        <li>
          <FaCheck />
          <p>Quality work done faster</p>
        </li>
        <li>
          <FaCheck />
          <p>Access to talent and businesses across the globe</p>
        </li>
      </ul>
    </div>
  );
}
