import { useState, useEffect } from "react";

function useTruncateText(inputString, chars = 100) {
  const [truncatedString, setTruncatedString] = useState("");

  useEffect(() => {
    if (inputString?.length > 150) {
      setTruncatedString(inputString.substring(0, chars) + "...");
    } else {
      setTruncatedString(inputString);
    }
  }, [inputString]);

  return truncatedString;
}

export default useTruncateText;
