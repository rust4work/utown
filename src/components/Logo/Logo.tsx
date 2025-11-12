import React from "react";
import logoFull from "../../assets/images/Logo-full.svg";
import logoSm from "../../assets/images/Logo.svg";

function Logo({ type = "small" }) {
  const logoSrc = type === "full" ? logoFull : logoSm;

  return (
    <div>
      <img src={logoSrc} alt="Company logo" />
    </div>
  );
}

export default Logo;
