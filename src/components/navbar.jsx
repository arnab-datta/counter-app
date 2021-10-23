import React from "react";

// Stateless Functional Component

const NavBar = ({ totalCounters }) => {
  return (
    <nav className="navbar navbar-light">
      <div className="navbar-brand">
        <i className="fa fa-shopping-cart fa-lg m-2" aria-hidden="true" />
        <span
          className="badge badge-pill badge-info m-2"
          style={{ width: 50, fontSize: "24px" }}
        >
          {totalCounters}
        </span>
        Items
      </div>
    </nav>
  );
};

export default NavBar;
