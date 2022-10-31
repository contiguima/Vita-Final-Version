import React from "react";
import { Grid, Paper, Container, Typography } from "@mui/material";
import Navbar from "./navbar";
import { container, paper, typography } from "./styles";

const Admin_Dashboard = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" sx={typography}>
              ADMIN DASHBOARD
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={paper}>
              <Typography variant="h6">
                <b>Tu trabajo es: </b>
                <br />
                Verificar los datos de los doctores{" "}
                <br />
                Llevar un control de los pacientes <br />
                Crear noticias para la comunidad <br />
               
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Admin_Dashboard;
