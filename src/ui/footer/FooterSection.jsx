import { Link } from "react-router";

export default function FooterSection({ items, title }) {
  return (
    <div>
      <h1 className="footer_section_title">{title}</h1>
      <ul>
        {items.map((item) => (
          <li key={item.title}>
            <Link className="title">{item.title}</Link>
            <Link className="subtitle">{item?.subtitle}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
