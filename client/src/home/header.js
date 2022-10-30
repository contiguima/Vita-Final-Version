import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { box, headerBox, headerPaper, raleway, subtitle } from "./styles";

const Header = () => {
  return (
    <Paper sx={headerPaper}>
      {/* Increase the priority of the hero background image */}
      {
        <img
          style={{ display: "none" }}
          src={process.env.PUBLIC_URL + "images/home.jpg"}
          alt="Vita"
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
            ></Typography>
            <Typography variant="h5" color="inherit" paragraph sx={raleway}>
            Encuentre al profesional que necesita. Mas de 600 prestadores de salud a su disposición
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Header;
