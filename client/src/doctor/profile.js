import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { Avatar, Container, Grid, Paper, Typography } from "@mui/material";
import Title from "./dashboard/title";
import { container, paper, avatar, upload } from "./styles";
import Ratings from "./ratings";
import Reviews from "./reviews";

const Doctor_Profile = () => {
  const { currentUser } = useAuth();
  const [doctors, setDoctors] = useState([]);

  // FETCH DOCTOR'S DATA FROM DB
  useEffect(() => {
    db.collection("doctors").onSnapshot((snapshot) => {
      setDoctors(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="false" sx={container}>
        {doctors.map((doctor) => {
          if (doctor.uid === currentUser.uid)
            return (
              <Grid container spacing={3}>
                {/* DOCTOR'S PROFILE IMAGE */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper sx={upload}>
                    <Title>{doctor.name}</Title>
                    <Avatar
                      alt="Doctor_Profile_Image"
                      src={`${doctor.imageURL}`}
                      sx={avatar}
                    />
                  </Paper>
                </Grid>

                {/* DOCTOR'S PROFILE */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper sx={paper}>
                    <Title>Perfil</Title>
                    <Typography sx={{ fontStyle: "italic" }}>
                      (Podes modificar estos datos en tu Dashboard)
                    </Typography>
                    <br />

                    <Typography>Nombre: {doctor.name}</Typography>
                    <Typography>
                      Especialidad médica: {doctor.medicalSpeciality}
                    </Typography>
                    <Typography >
                      Honorarios: {doctor.experience}
                    </Typography>
                    <Typography>Edad: {doctor.age}</Typography>
                    <Typography>Genero: {doctor.gender}</Typography>
                    <Typography>Titulo: {doctor.degree}</Typography>
                    <Typography>
                      Dirección: {doctor.address1}, {doctor.address2},{" "}
                      {doctor.city}, {doctor.state}, {doctor.country},{" "}
                      {doctor.pincode}
                    </Typography>
                    <Typography>
                      Horarios de consulta :{" "}
                      {new Date(doctor.startTime.seconds * 1000).getHours()}:
                      {new Date(doctor.startTime.seconds * 1000).getMinutes()}0
                      - {new Date(doctor.endTime.seconds * 1000).getHours()}:
                      {new Date(doctor.endTime.seconds * 1000).getMinutes()}0
                      hrs
                    </Typography>
                    <Typography variant="subtitle2">
                      Actualizado por ultima vez: {" "}
                      {new Date(
                        doctor.updatedAt.seconds * 1000
                      ).toLocaleDateString("en-US")}
                      , at{" "}
                      {new Date(doctor.updatedAt.seconds * 1000).getHours()}:
                      {new Date(doctor.updatedAt.seconds * 1000).getMinutes()}{" "}
                      hrs
                    </Typography>
                  </Paper>
                </Grid>

                {/* RATINGS */}
                <Grid item xs={12}>
                  <Ratings uid={currentUser.uid} />
                </Grid>

                {/* REVIEWS */}
                <Grid item xs={12}>
                  <Reviews uid={currentUser.uid} />
                </Grid>
              </Grid>
            );
        })}
      </Container>
    </>
  );
};

export default Doctor_Profile;
