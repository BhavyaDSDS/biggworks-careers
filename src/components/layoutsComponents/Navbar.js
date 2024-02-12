import { AppBar, Box, Toolbar, Typography, Link, Container } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/system";

function Navbar() {
  const theme = useTheme();

  return (
    <div >
      <AppBar sx={{ background: "#fff", boxShadow:"none", marginBottom:"22px", padding:"1.4rem 1rem"}}>
        <Toolbar >

          <Box sx={{width:"100%",background:"#fff",maxWidth:"118rem",margin:"auto",display:"flex",alignItems:"center"}}>
          <Box sx={{ flexGrow: 1 }}>

            <Link href="https://biggworks.com/">
              <img
              style={{width:"95px", height:"63px"}}
                src="https://res.cloudinary.com/biggworks/image/upload/v1697800312/logo/Biggworks-logo.svg"
                alt=""
              />
            </Link>
          </Box>
          <Box sx={{ display: "flex", gap: "42px" }}>
            <Link href="https://biggworks.com/services/" underline="none">
              <Typography sx={{letterSpacing:"0.6px", fontSize:"17px", fontWeight:400, color:"#1d2a3d"}}>Sevices</Typography>
            </Link>
            <Link href="https://biggworks.com/works/" underline="none">
              <Typography
                sx={{ letterSpacing:"0.6px", color: "#1d2a3d", fontWeight: 400, fontSize: "17px" }}
              >
                Works
              </Typography>
            </Link>
            <Link href="https://biggworks.com/articles/" underline="none">
              <Typography
                sx={{ letterSpacing:"0.6px", color: "#1d2a3d", fontWeight: 400, fontSize: "17px" }}
              >
                Posts
              </Typography>
            </Link>
            <Link href="https://biggworks.com/careers/" underline="none">
              <Typography
                sx={{ letterSpacing:"0.6px", color: "#1d2a3d", fontWeight: 400, fontSize: "17px" }}
              >
                Careers
              </Typography>
            </Link>
            <Link href="
            https://biggworks.com/contact/" underline="none">
              <Typography
                sx={{ letterSpacing:"0.6px", color: "#1d2a3d", fontWeight: 400, fontSize: "17px" }}
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