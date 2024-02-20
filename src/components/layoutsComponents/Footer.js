import { KALIBRE_TITLE } from "@/constants/MediaConstants";
import { Box, Button, TextField, Typography } from "@mui/material";
import Image from "next/image";

function Footer() {
  return (
    <Box>
      <Box>
        <Typography variant="h3">Join the Kalibre community</Typography>
        <TextField
          placeholder="Enter your email"
          InputProps={{
            endAdornment: <Button variant="contained">Subscribe</Button>,
          }}
        />
      </Box>

      <Box>
        <Box>
          <Box>
            <img src={KALIBRE_TITLE} alt="kalibre ai" 
            width={"10%"}
            />
          </Box>
          <Typography variant="body2">&copy; 2023 All rights reserverd.</Typography>
          <Typography variant="body2">DWise Techlabs Pvt ltd.</Typography>
        </Box>
        <Box></Box>
        <Box></Box>
      </Box>
    </Box>
  );
}

export default Footer;
