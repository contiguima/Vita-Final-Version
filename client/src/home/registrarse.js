import Register from "./register";
import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./navbar";
import { Container, CssBaseline } from "@mui/material";

const sections = [
    { title: "Home", url: "/" },
    
    
  ];
  const theme = createTheme();
  
 
 const Registrarse = () => {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="false" sx={{ backgroundColor: "#d7e8f4" }}>
          {/* NAVBAR COMPONENT - links to various sections*/}
          <Navbar sections={sections} />
          <main>
          <Register />
          </main>
        </Container>
      </ThemeProvider>
    );
  };
  
  export default Registrarse;