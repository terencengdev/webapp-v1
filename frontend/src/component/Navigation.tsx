import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import logo from "../assets/logo.svg";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PermContactCalendarRoundedIcon from "@mui/icons-material/PermContactCalendarRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { getCookie } from "typescript-cookie";

export default function Navigation() {
  const [open, setOpen] = React.useState(false);
  const [showhamburger, setShowHamburger] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    // Check if user is already logged in
    const token = getCookie("authToken");
    if (token) {
      setShowHamburger(true);
    }
  }, []);

  const itemsList = [
    {
      text: "My Contacts",
      icon: <PermContactCalendarRoundedIcon />,
      to: "/home", // <-- add link targets
    },
    {
      text: "My Profile",
      icon: <AccountCircleRoundedIcon />,
      to: "/my-profile",
    },
    {
      text: "Edit Profile",
      icon: <AccountCircleRoundedIcon />,
      to: "/edit-profile",
    },
    {
      text: "Logout",
      icon: <LogoutRoundedIcon />,
      to: "/logout",
    },
  ];
  return (
    <AppBar
      color="transparent"
      sx={{ height: "50px", boxShadow: "none", padding: "10px" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link href="/home">
          <img className="main-logo" src={logo} alt="Main Logo" />
        </Link>

        {/* hamburger icon shows the drawer on click */}
        {showhamburger && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Drawer
          anchor="right"
          //if open is true, drawer is shown
          open={open}
          //function that is called when the drawer should close
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{ width: 300 }}
            role="presentation"
            onClick={toggleDrawer(false)}
          >
            <List sx={{ paddingTop: "5%" }}>
              {itemsList.map((item, index) => {
                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton href={item.to}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText
                        sx={{ fontWeight: 300 }}
                        primary={item.text}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
