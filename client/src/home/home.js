import * as React from "react";
import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./navbar";
import Header from "./header";
import About from "./about";
import Testimonials from "./testimonials";
import Footer from "./footer";


const sections = [
  { title: "Home", url: "#" },
  { title: "Acerca de", url: "#acercade" },
  { title: "Registrarse", url: "/registrarse" },
  
];

const theme = createTheme();

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="false" sx={{ backgroundColor: "#d7e8f4" }}>
        {/* NAVBAR COMPONENT - links to various sections*/}
        <Navbar sections={sections} />

        <main>
          {/* HEADER COMPONENT - image with tagline*/}
          <Header />
          <img
          style={{ display: "flex" , height: "100%", width:"100%"}}
          src={process.env.PUBLIC_URL + "images/promos2.png"}
          alt="Publicidad"
        />
          {/* REGISTER COMPONENT - signup/signin for doctor/patient */}
          
          <br />
          <br />
          {/* ABOUT COMPONENT - about doctors */}
          <About />
          {/* TESTIMONIALS COMPONENT - patient testimonials */}
          <Footer/>
          
        </main>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
