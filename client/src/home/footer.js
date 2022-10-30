import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
  footerBox,
  footerTitle,
  iconButton,
  raleway,
  sendButton,
} from "./styles";

const Copyright = () => {
  return (
    <Typography variant="body2" color="#ffffff" align="center" sx={raleway}>
      {"Copyright © "} {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box component="footer" sx={footerBox} id="contact">
      {/* COPYRIGHT */}
      <Container maxWidth="false">
        <Typography variant="h5" align="center" gutterBottom sx={raleway}>
        ¿Te gustó el contenido de la Comunidad vita? ¡Suscribite!
        </Typography>
       

        
          

         

          {/* NEWSLETTER SUBSCRIPTION */}
         
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                sx={{
                  backgroundColor: "#ffffff",
                  fontFamily: "Raleway",
                }}
              />
              <Button
                type="submit"
                variant="contained"
                startIcon={<SendIcon />}
                sx={sendButton}
              >
                Suscribirse
              </Button>
            </form>
       
        
      </Container>
    </Box>
  );
};

export default Footer;
