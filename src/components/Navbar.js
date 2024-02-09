import { AppBar, Box, Toolbar, Typography, Link, Container } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/system";

function Navbar() {
  const theme = useTheme();

  return (
    <div >
      <AppBar sx={{ background: "#fff", boxShadow:"none", marginBottom:"22px"}}>
        <Toolbar >

          <Box sx={{width:"90%",background:"#fff",maxWidth:"90rem",margin:"auto",display:"flex",alignItems:"center"}}>
          <Box sx={{ flexGrow: 1 }}>

            <Link href="https://biggworks.com/">
              <img
                src="https://res.cloudinary.com/biggworks/image/upload/v1697800312/logo/Biggworks-logo.svg"
                alt=""
              />
            </Link>
          </Box>
          <Box sx={{ display: "flex", gap: "22px" }}>
            <Link href="https://biggworks.com/services/" underline="none">
              <Typography sx={{letterSpacing:"0.6px", fontSize:"100%", fontWeight:500, color:"#1d2a3d"}}>Sevices</Typography>
            </Link>
            <Link href="https://biggworks.com/works/" underline="none">
              <Typography
                sx={{ color: "#1d2a3d", fontWeight: 500, fontSize: "90%" }}
              >
                Works
              </Typography>
            </Link>
            <Link href="https://biggworks.com/articles/" underline="none">
              <Typography
                sx={{ color: "#1d2a3d", fontWeight: 500, fontSize: "90%" }}
              >
                Posts
              </Typography>
            </Link>
            <Link href="https://biggworks.com/careers/" underline="none">
              <Typography
                sx={{ color: "#1d2a3d", fontWeight: 500, fontSize: "90%" }}
              >
                Careers
              </Typography>
            </Link>
            <Link href="
            https://biggworks.com/contact/" underline="none">
              <Typography
                sx={{ color: "#1d2a3d", fontWeight: 500, fontSize: "90%" }}
              >
                Contact
              </Typography>
            </Link>
          </Box>
          </Box>


        </Toolbar>
      </AppBar>
      
    </div>
  );
}

export default Navbar;