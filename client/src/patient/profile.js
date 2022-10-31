import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { Avatar, Container, Grid, Paper, Typography } from "@mui/material";
import Title from "./dashboard/title";
import { container, paper, avatar, upload } from "./styles";
import BPGraph from "./bpGraph";
import WeightGraph from "./weightGraph";

const Patient_Profile = () => {
  const { currentUser } = useAuth();
  const [patients, setPatients] = useState([]);

  // FETCHING PATIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("patients").onSnapshot((snapshot) => {
      setPatients(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="false" sx={container}>
        {patients.map((patient) => {
          if (patient.uid === currentUser.uid)
            return (
              <Grid container spacing={3}>
                {/* PATIENT'S PROFILE IMAGE */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper sx={upload}>
                    <Title>{patient.name}</Title>
                    <Avatar
                      alt="Patient_Profile_Image"
                      src={`${patient.imageURL}`}
                      sx={avatar}
                    />
                  </Paper>
                </Grid>

                {/* PATIENT'S PROFILE */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper sx={paper}>
                    <Title>Perfil</Title>
                    <Typography sx={{ fontStyle: "italic" }}>
                      (Podes actualizar estos datos en la sección Dashboard)
                    </Typography>
                    <Typography>Nombre completo: {patient.name}</Typography>
                    <Typography>Edad: {patient.age}</Typography>
                    <Typography>Género: {patient.gender}</Typography>
                    <Typography>Grupo sanguíneo: {patient.bloodGroup}</Typography>
                    <Typography>
                      Dirección: {patient.address1}, {patient.address2},{" "}
                      {patient.city}, {patient.state}, {patient.country}
                    </Typography>
                    <Typography>Código postal: {patient.pincode}</Typography>
                    <Typography variant="subtitle2">
                      Actualizado por última vez:{" "}
                      {new Date(
                        patient.updatedAt.seconds * 1000
                      ).toLocaleDateString("en-US")}
                      , at{" "}
                      {new Date(patient.updatedAt.seconds * 1000).getHours()}:
                      {new Date(patient.updatedAt.seconds * 1000).getMinutes()}0hrs
                    </Typography>
                  </Paper>
                </Grid>

                {/* GRAPHS */}
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 275,
                    }}
                  >
                    <BPGraph uid={patient.uid} />
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 275,
                    }}
                  >
                    <WeightGraph uid={patient.uid} />
                  </Paper>
                </Grid>
              </Grid>
            );
        })}
      </Container>
    </>
  );
};

export default Patient_Profile;
