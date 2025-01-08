import { Link } from "react-router";

export default function ShowAll({ sectionName, ...props }) {
  return (
    <div className="links">
      <p>{sectionName} </p>
      <Link {...props}>Show All</Link>
    </div>
  );
}
