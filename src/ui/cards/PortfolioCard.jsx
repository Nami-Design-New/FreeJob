import { Link } from "react-router-dom";

function PortfolioCard({ setRow, portfolio }) {
  return (
    <Link to={`/portfolios/${portfolio.title}`}>
      <div
        className="portfolio-card"
        onClick={() => {
          setRow(portfolio);
        }}
      >
        <div className="img">
          <img src={portfolio?.images[0]?.image} alt="portfolio" />
          <Link to={`/profile/${portfolio?.user?.id}`} className="user">
            <img src={portfolio?.user?.image} alt="avatar" />
          </Link>
        </div>
        <div className="info">
          <h6>{portfolio?.title}</h6>
          <ul>
            <li>
              <i className="fa-sharp fa-regular fa-eye"></i>{" "}
              {portfolio?.view_count || 0}
            </li>
            <li>
              <i className="fa-solid fa-thumbs-up"></i>{" "}
              {portfolio?.likes_count || 0}
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
}

export default PortfolioCard;
