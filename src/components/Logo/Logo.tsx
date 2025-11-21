import React from "react";
import logoFull from "../../assets/images/Logo-full.svg";
import logoSm from "../../assets/images/Logo.svg";
import logoSmWhite from "../../assets/images/logoSmWhite.svg";

function Logo({ type = "small" }) {
  let logoSrc;

  switch (type) {
    case "full":
      logoSrc = logoFull;
      break;

    case "white":
      logoSrc = logoSmWhite;
      break;

    case "small":
    default:
      logoSrc = logoSm;
      break;
  }

  return <img src={logoSrc} alt="Company logo" />;
}

export default Logo;
