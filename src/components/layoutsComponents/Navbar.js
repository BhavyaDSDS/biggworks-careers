import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Link,
  Container,
  List,
  ListItem,
  ListItemButton,
  IconButton,
  Drawer,
} from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
const drawerWidth = 331;
const navItems = [
  {
    name: "Sevices",
    link: "https://biggworks.com/services/",
    landingPages: [
      {
        name: "IOT Development",
        link: "https://biggworks.com/iot-development/",
      },
      {
        name: "Mobile App Development",
        link: "https://biggworks.com/mobile-apps/",
      },
      { name: "Web Developent", link: "https://biggworks.com/web-apps/" },
      {
        name: "Team Extension",
        link: "https://biggworks.com/staff-augmentation/",
      },
    ],
  },

  { name: "Works", link: "https://biggworks.com/works/" },
  { name: "Posts", link: "https://biggworks.com/articles/" },
  { name: "Careers", link: "https://biggworks.com/careers/" },
  { name: "Contact", link: "https://biggworks.com/contact/" },
];
function Navbar() {
  const theme = useTheme();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const handleDrawerToggleOpen = () => {
    setMobileDrawerOpen(true);
  };
  const handleDrawerToggleClose = () =>{
    setMobileDrawerOpen(false)
  }
  const drawer = (
    <Box onClick={handleDrawerToggleOpen}>
      <Box>
        <Link href="https://biggworks.com/">
          <img
            src="https://res.cloudinary.com/biggworks/image/upload/v1696927992/logo/biggworks_logo2.svg"
            alt="Biggworks Logo"
          />
        </Link>
        <List>
          {navItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.link}
                  underline="none"
                  
                >
                  <Typography
                    sx={{
                      letterSpacing: "0.6px",
                      fontSize: "17px",
                      fontWeight: 400,
                      color: "#fff",
                    }}
                  >
                    {item.name}
                  </Typography>
                </ListItemButton>
              </ListItem>
              {item.landingPages && (
                <List sx={{ pl: 2 }}>
                  {item.landingPages.map((landingPage, landingPageIndex) => (
                    <ListItem key={landingPageIndex} disablePadding>
                      <ListItemButton
                        component={Link}
                        href={landingPage.link}
                        underline="none"
                      >
                        <Typography
                          sx={{
                            letterSpacing: "0.6px",
                            fontSize: "17px",
                            fontWeight: 400,
                            color: "#fff",
                          }}
                        >
                          {landingPage.name}
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <div>
      <AppBar
        sx={{
          background: "#fff",
          boxShadow: "none",
          marginBottom: "22px",
          padding: "1.4rem 1rem",
        }}
      >
        <Toolbar>
          <Box sx={{display: { sm: "none" },flexGrow:1}}>
          <Box sx={{ display: "flex",  width: "100%" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Link href="https://biggworks.com/">
                <img
                  style={{ width: "95px", height: "63px" }}
                  src="https://res.cloudinary.com/biggworks/image/upload/v1697800312/logo/Biggworks-logo.svg"
                  alt=""
                />
              </Link>
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggleOpen}
              sx={{ mr: 2, color: "black" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          </Box>
          <Box sx={{ display: { xs: "none", md: "block" },flexGrow:1}}>
          <Box
            sx={{
              width: "100%",
              background: "#fff",
              maxWidth: "118rem",
              margin: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Link href="https://biggworks.com/">
                <img
                  style={{ width: "95px", height: "63px" }}
                  src="https://res.cloudinary.com/biggworks/image/upload/v1697800312/logo/Biggworks-logo.svg"
                  alt=""
                />
              </Link>
            </Box>
            <Box sx={{ display: "flex", gap: "42px" , marginLeft:"auto"}}>
              <Link href="https://biggworks.com/services/" underline="none">
                <Typography
                  sx={{
                    letterSpacing: "0.6px",
                    fontSize: "17px",
                    fontWeight: 400,
                    color: "#1d2a3d",
                  }}
                >
                  Sevices
                </Typography>
              </Link>
              <Link href="https://biggworks.com/works/" underline="none">
                <Typography
                  sx={{
                    letterSpacing: "0.6px",
                    color: "#1d2a3d",
                    fontWeight: 400,
                    fontSize: "17px",
                  }}
                >
                  Works
                </Typography>
              </Link>
              <Link href="https://biggworks.com/articles/" underline="none">
                <Typography
                  sx={{
                    letterSpacing: "0.6px",
                    color: "#1d2a3d",
                    fontWeight: 400,
                    fontSize: "17px",
                  }}
                >
                  Posts
                </Typography>
              </Link>
              <Link href="https://biggworks.com/careers/" underline="none">
                <Typography
                  sx={{
                    letterSpacing: "0.6px",
                    color: "#1d2a3d",
                    fontWeight: 400,
                    fontSize: "17px",
                  }}
                >
                  Careers
                </Typography>
              </Link>
              <Link
                href="
            https://biggworks.com/contact/"
                underline="none"
              >
                <Typography
                  sx={{
                    letterSpacing: "0.6px",
                    color: "#1d2a3d",
                    fontWeight: 400,
                    fontSize: "17px",
                  }}
                >
                  Contact
                </Typography>
              </Link>
            </Box>
          </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          anchor="right"
          open={mobileDrawerOpen}
          onClose={handleDrawerToggleClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "black",
              padding:"20px"
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </div>
  );
}

export default Navbar;
