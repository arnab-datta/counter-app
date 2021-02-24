import React from "react";
import { Button } from '@material-ui/core';
import ManagePowersPanel from "./components/ManagePowersPanel";


// Stateless Functional Component

const NavBar = ({toggleManagePowers}) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="navbar-brand">
      <Button
      color="primary"
      variant="contained"
      onClick={toggleManagePowers}> Manage Powers </Button>
      </div>
    </nav>
  );
};

export default NavBar;
