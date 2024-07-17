import React, { useState } from "react";

import { AppBar, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import { Add, Error, List, Login, Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import LogoffPage from "../domain/login/Logoff";

const Nav: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function handleMenuOpen(event: React.MouseEvent<HTMLButtonElement>): void {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose(): void {
    setAnchorEl(null);
  }

  return (
    <AppBar>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="Menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="navigation-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <IconButton
              color="primary"
              aria-label="list"
              component={Link}
              to={`/list`}
            >
              Liste &nbsp;
              <List />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <IconButton
              color="primary"
              aria-label="new"
              component={Link}
              to={`/new`}
            >
              Neu &nbsp;
              <Add />
            </IconButton>
          </MenuItem>

          <MenuItem onClick={handleMenuClose}>
            <IconButton
              color="primary"
              aria-label="error"
              component={Link}
              to={`/abc`}
            >
              Error &nbsp;
              <Error />
            </IconButton>
          </MenuItem>

          <MenuItem onClick={handleMenuClose}>
            <IconButton
              color="primary"
              aria-label="logoff"
              component={Link}
              to={`/logoff`}
            >
              Ausloggen &nbsp;
              <Login />
            </IconButton>
          </MenuItem>

        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
