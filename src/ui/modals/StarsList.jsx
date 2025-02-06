export default function StarsRate({ rate, onRateChange }) {
  return (
    <div className="stars_rate">
      <div
        className="stars"
        style={{
          display: "flex", 
          gap: "8px", 
          cursor: "pointer",
        }}
      >
        {Array(5)
          .fill(0)
          .map((_, index) => {
            const starValue = index + 1; 
            return (
              <img
                key={starValue}
                src={
                  starValue <= rate
                    ? "/images/star-filled.svg"
                    : "/images/star.svg"
                }
                alt={starValue <= rate ? "filled star" : "empty star"}
                onClick={() => onRateChange(starValue)} 
                style={{ width: "20px", height: "20px" }} 
              />
            );
          })}
      </div>
    </div>
  );
}
