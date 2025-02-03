import { Link } from "react-router";

export default function Logo() {
  return (
    <Link className="logo" to="/">
      <img className="" src="/images/logo.svg" />
    </Link>
  );
}
