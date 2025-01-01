import { Link } from "react-router";

export default function Logo() {
  return (
    <Link className="logo" to="/">
      <img className="img-fluid " src="./images/logo.png" />
    </Link>
  );
}
