import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";
import Title from "../title";
import Age from "./age";
import Address from "./address";
import Degree from "./degree";
import Experience from "./experience";
import TimeSlot from "./timeSlot";

const theme = createTheme();

const Edit_Details = (props) => {
  const [doctors, setDoctors] = useState([]);

  // FETCHING PATIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("doctors").onSnapshot((snapshot) => {
      setDoctors(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {doctors.map((doctor) => {
          if (doctor.uid === props.uid)
            return (
              <Grid container spacing={1} key={doctor.uid}>
                <Grid item xs={12}>
                  <Title>¡Tu perfil fue verificado!</Title>
                  <Typography variant="subtitle2" gutterBottom>
                    (Todavía podes editar algunos detalles)
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography>Nombre completo: {doctor.name}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography>Género: {doctor.gender}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography>
                    Especialidad médica: {doctor.medicalSpeciality}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>
                        Honorarios: {doctor.experience}$
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Experience uid={doctor.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>Edad: {doctor.age} años</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Age uid={doctor.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>Título: {doctor.degree}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Degree uid={doctor.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>
                        Dirección: {doctor.address1}, {doctor.address2},
                        <br />
                        {doctor.city}, {doctor.state}, {doctor.country},{" "}
                        {doctor.pincode}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Address uid={doctor.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>
                        Horario de consulta :{" "}
                        {new Date(doctor.startTime.seconds * 1000).getHours()}:
                        {new Date(doctor.startTime.seconds * 1000).getMinutes()}
                         - {new Date(doctor.endTime.seconds * 1000).getHours()}
                        :{new Date(doctor.endTime.seconds * 1000).getMinutes()}
                        hrs
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <TimeSlot uid={doctor.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <br />
                <Grid item xs={12}>
                  <Typography variant="subtitle2">
                    Actualizado por última vez:
                    {new Date(
                      doctor.updatedAt.seconds * 1000
                    ).toLocaleDateString("en-US")}
                    ,{new Date(doctor.updatedAt.seconds * 1000).getHours()}:
                    {new Date(doctor.updatedAt.seconds * 1000).getMinutes()}
                  </Typography>
                </Grid>
              </Grid>
            );
        })}
      </Box>
    </ThemeProvider>
  );
};
export default Edit_Details;
