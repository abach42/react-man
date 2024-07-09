import React, { useState } from "react";

import { AppBar, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

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
            <Link to="/list">Liste</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/form">Formular</Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
