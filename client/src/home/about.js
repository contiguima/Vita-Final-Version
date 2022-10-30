import * as React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  box,
  description,
  aboutPaper,
  subtitle,
  raleway,
  headerBox,
} from "./styles";
import { fontFamily } from "@mui/system";

const About = () => {
  return (
    <div id="about">
       <h1 
       style={{backgroundColor: "#3E8FDA", 
       textAlign:"center", 
       color:"#fff",
       fontFamily: "Montserrat"}}
       >Comunidad Vita</h1>
      <Typography
        component="h1"
        variant="h5"
        color="inherit"
        align="center"
        gutterBottom
        sx={description}
      >
       ¡Tu salud nos importa! Por eso nació Comunidad Vita, 
       un espacio para compartir información y novedades en custiones 
       de salud. Te invitamos a vitalizarte.
        <br />
        {/* <i>
          <b> Let's together bring a change in the medical industry!</b>
        </i> */}
      </Typography>
      <Paper sx={aboutPaper}>
        {/* Increase the priority of the hero background image */}
        {
          <img
            style={{ display: "none" }}
            src={process.env.PUBLIC_URL + "images/doctors.jpg"}
            alt="Doctors"
          />
        }
        <Box sx={box} />

        {/* Text above image */}
        <Grid container>
          <Grid item md={6}>
            <Box sx={headerBox}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
                sx={subtitle}
              >
                "Titulo de la noticia"
              </Typography>
              <Typography variant="h5" color="inherit" paragraph sx={raleway}>
               Novedad acerca de la medicina, con foto de fondo
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={aboutPaper}>
        {/* Increase the priority of the hero background image */}
        {
          <img
            style={{ display: "none" }}
            src={process.env.PUBLIC_URL + "images/doctors.jpg"}
            alt="Doctors"
          />
        }
        <Box sx={box} />

        {/* Text above image */}
        <Grid container>
          <Grid item md={6}>
            <Box sx={headerBox}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
                sx={subtitle}
              >
                "Titulo de la noticia"
              </Typography>
              <Typography variant="h5" color="inherit" paragraph sx={raleway}>
               Novedad acerca de la medicina, con foto de fondo
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={aboutPaper}>
        {/* Increase the priority of the hero background image */}
        {
          <img
            style={{ display: "none" }}
            src={process.env.PUBLIC_URL + "images/doctors.jpg"}
            alt="Doctors"
          />
        }
        <Box sx={box} />

        {/* Text above image */}
        <Grid container>
          <Grid item md={6}>
            <Box sx={headerBox}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
                sx={subtitle}
              >
                "Titulo de la noticia"
              </Typography>
              <Typography variant="h5" color="inherit" paragraph sx={raleway}>
               Novedad acerca de la medicina, con foto de fondo
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default About;
