import { Link } from "react-router";

export default function FooterSection({ items, title }) {
  return (
    <div>
      <h1 className="footer_section_title">{title}</h1>
      <ul>
        {items.map((item) => (
          <li key={item.name}>
            <Link
              className="title"
              to={`/services?categories=${item.category_id}`}
            >
              {item.name}
            </Link>
            {/* <Link className="subtitle">{item?.name}</Link> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
