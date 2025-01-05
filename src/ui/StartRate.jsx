export default function StarsRate({ rate, reviewsCount }) {
  return (
    <div className="stars_rate">
      <div className="stars">
        {Array(Math.round(rate))
          .fill(0)
          .map(() => {
            return (
              <img
                key={Math.random()}
                src="/icons/star-filled.svg"
                alt="filled star"
              />
            );
          })}
        {Array(5 - Math.round(rate))
          .fill(0)
          .map(() => {
            return <img key={Math.random()} src="/icons/star.svg" alt="star" />;
          })}
      </div>
      {reviewsCount && <span>{reviewsCount} review</span>}
    </div>
  );
}
