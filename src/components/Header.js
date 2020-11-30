import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <nav id="navigation">
      <Link href="#" className="logo" to="/">
        <h1>TableFree</h1>
      </Link>
      <Link href="#" className="nav-item" to="/bookingPage">
        <li>Booking Page</li>
      </Link>
    </nav>
  );
};
export default Header;