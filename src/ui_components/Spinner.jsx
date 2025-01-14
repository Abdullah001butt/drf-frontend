import React, { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

const spinnerStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(8px)",
  zIndex: 9999,
};

const Spinner = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div style={spinnerStyles}>
      <ScaleLoader
        height={35}
        width={4}
        radius={2}
        margin={2}
        color={"purple"}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
