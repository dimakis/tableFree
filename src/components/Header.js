import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <nav id="navigation">
      <Link href="#" className="logo" to="/">
        <h1>TableFree</h1>
      </Link>
    </nav>
  );
};
export default Header;