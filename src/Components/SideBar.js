import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import HomeIcon from '@mui/icons-material/Home';
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import TelaInicial from "./TelaInicial";
import { Typography } from "@mui/material";
import ConstructionIcon from '@mui/icons-material/Construction';

export default function SideBar(props) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const linkList = [
    { text: "Home", path: "/home", icon: <HomeIcon />},
    { text: "Meus Servicos", path: "/Servicos", icon: <DesignServicesIcon /> },
    { text: "Logout", path: "#", icon: <LogoutIcon /> },
  ];

  const DrawerList = (
    <Box
      sx={{
        width: 270,
        background: "black",
        color: "white",
        height: "100vh",
        alignItems: "center",
        justifyContent: "Space-evenly",
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Typography variant="h5" position={'top'} 
        sx={{
          margin: 2,
          padding: 2
        }}>
        <ConstructionIcon />
        QUICK FIX
      </Typography>
      <Divider />
      <List>
        {linkList.map((item) => (
          <ListItem key={item.text}>
            <Link style={{textDecoration:"none",
              color:"#fff",
              width :"100%"
            }} to={item.path}>
              <ListItemButton
                sx={{
                  background: "#c7c7c7",
                  borderRadius: "10px",
                  display: "flex",
                  paddingRight: "50px",
                }}
              >
                <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text}  />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div className="menuIcon">
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon
          sx={{
            width: "50px",
            height: "50px",
            color: 'white'
          }}
        />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
