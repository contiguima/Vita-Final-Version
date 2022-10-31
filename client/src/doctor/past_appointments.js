import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { Grid, List, ListItem, Typography } from "@mui/material";
import { container, listItem, typography } from "./styles";
import Appointments from "../patient/appointments";
import Title from "./dashboard/title";

const Past_Appointments = (props) => {
  const [appointments, setAppointments] = useState([]);

  // FETCHING APPOINTMENTS' DATA FROM DB
  useEffect(() => {
    db.collection("appointments")
      .orderBy("timeSlot", "desc")
      .onSnapshot((snapshot) => {
        setAppointments(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
  }, []);

  return (
    <>
      <Title>Turnos Pasados</Title>
      <List>
        {appointments.map((appointment) => {
          if (
            appointment.isConfirmed === "true" &&
            appointment.doctorUID === props.doctorUID &&
            appointment.patientUID === props.patientUID
          )
            return (
              <ListItem sx={listItem}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      <b>Tipo de consulta:</b> {appointment.mode} <br />
                      <b>Fecha y horario:</b>{" "}
                      {new Date(
                        appointment.timeSlot.seconds * 1000
                      ).toLocaleDateString("en-US")}
                      ,
                      {new Date(appointment.timeSlot.seconds * 1000).getHours()}
                      :
                      {new Date(
                        appointment.timeSlot.seconds * 1000
                      ).getMinutes()}
                      <br />
                      <b>Sintomas:</b> {appointment.symptoms}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography>
                      <b>Prescripción: </b>
                      <Appointments
                        appointmentID={appointment.id}
                        doctorUID={appointment.doctorUID}
                        patientUID={appointment.patientUID}
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            );
        })}
      </List>
    </>
  );
};

export default Past_Appointments;
