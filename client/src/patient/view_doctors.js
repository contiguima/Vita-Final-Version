import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import {
  Avatar,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { container, listItem, typography } from "./styles";
import Title from "./dashboard/title";

const View_Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const { currentUser } = useAuth();

  // FETCHING PATIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("patients").onSnapshot((snapshot) => {
      setPatients(snapshot.docs.map((doc) => doc.data()));
    });
  });

  // FETCHING DOCTOR'S DATA FROM DB
  useEffect(() => {
    db.collection("doctors").onSnapshot((snapshot) => {
      setDoctors(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  useEffect(() => {
    setSearch("");
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="100%" sx={container}>
        <Typography align="center" variant="h4" sx={typography}>
          Sacar turno con cualquier doctor de Vita
        </Typography>

        {/* SEARCH BAR */}
        <TextField
          margin="normal"
          fullWidth
          id="search"
          label="Buscar por Nombre/Ciudad/Especialidad"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {patients.map((patient) => {
          if (patient.uid === currentUser.uid)
            if (patient.isVerified === "true") {
              return (
                <List>
                  {doctors
                    .filter((doctor) => {
                      if (doctor.isVerified === "true") {
                        if (search == "") return doctor;
                        else if (
                          doctor.name
                            .toLowerCase()
                            .includes(search.toLocaleLowerCase())
                        )
                          return doctor;
                        else if (
                          doctor.medicalSpeciality
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        )
                          return doctor;
                        else if (
                          doctor.city
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        )
                          return doctor;
                      }
                    })
                    .map((doctor) => {
                      return (
                        <ListItem sx={listItem}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={3} md={3}>
                              <Avatar
                                alt="Doctor_Profile_Image"
                                src={`${doctor.imageURL}`}
                                sx={{
                                  width: 100,
                                  height: 100,
                                  border: "1px solid #08475e",
                                }}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                              <Typography
                                variant="h6"
                                color="primary"
                                gutterBottom
                                sx={{ fontWeight: "bold" }}
                              >
                                {doctor.name} <br />
                                {doctor.medicalSpeciality} <br />
                                {doctor.city} <br />
                                Horarios de atención :{" "}
                                {new Date(
                                  doctor.startTime.seconds * 1000
                                ).getHours()}
                                :
                                {new Date(
                                  doctor.startTime.seconds * 1000
                                ).getMinutes()}
                                 -{" "}
                                {new Date(
                                  doctor.endTime.seconds * 1000
                                ).getHours()}
                                :
                                {new Date(
                                  doctor.endTime.seconds * 1000
                                ).getMinutes()}
                                 hrs
                              </Typography>
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                              <Button
                                variant="contained"
                                href={`/doctor_profile/${doctor.uid}`}
                                target="_blank"
                              >
                                Ver más
                              </Button>
                            </Grid>
                          </Grid>
                        </ListItem>
                      );
                    })}
                </List>
              );
            } else {
              return (
                <Title>
                  <br />
                  Primero tenes que completar tus datos <br />
                  Dirigite a la sección Dashboard
                </Title>
              );
            }
        })}
      </Container>
    </>
  );
};

export default View_Doctors;
