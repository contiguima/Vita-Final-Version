import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./navbar";
import { db } from "../firebase";
import { Avatar, Container, Grid, Paper, Typography } from "@mui/material";
import Title from "./dashboard/title";
import { container, paper, avatar, upload } from "./styles";
import BPGraph from "./bpGraph";
import WeightGraph from "./weightGraph";
import Past_Appointments from "./past_appointments";
import {
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Tooltip,
  DialogContentText,
  List,
  ListItem,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import ChatIcon from "@mui/icons-material/Chat";

const Patient = () => {

  
  //otras variables
  const [patients, setPatients] = useState([]);
  const { currentUser } = useAuth();

  const location = useLocation();
  const uid = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  //VARIABLES CHAT
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const sendMessage = (e) => {
    e.preventDefault();

    //PUSHING MESSAGE IN DATABASE
    db.collection("meetings")
      .doc(`1`)
      .collection("chats")
      .add({
        message: message,
        senderEmail: currentUser.email,
        senderUid: currentUser.uid,
        sentAt: new Date(),
      });

    setMessage("");
  };
  useEffect(() => {
    db.collection(`meetings/1/chats`)
      .orderBy("sentAt", "asc")
      .onSnapshot((snapshot) => {
        setChats(snapshot.docs.map((doc) => doc.data()));
      });
  }, [`1`]);

  // FETCHING PATIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("patients").onSnapshot((snapshot) => {
      setPatients(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  // VARIABLES PARA SUBIR REPORTES:
  const [open, setOpen] = useState(false);
  const [sugarLevel, setSugarLevel] = useState("");
  const [weight, setWeight] = useState("");

  //FUNCTIONS TO OPEN AND CLOSE DIALOG BOX
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openMsg, setOpenMsg] = useState(false);
  
  const handleClickOpenMsg = () => {
    setOpenMsg(true);
  };

  const handleCloseMsg = () => {
    setOpenMsg(false);
  };


  //SEND PRESCRIPTION FUNCTION
  const updateReports = (e) => {
    e.preventDefault();

    //PUSHING BP DATA IN DATABASE
    patients.map((patient) => {
    db.collection("patients")
      .doc(`${patient.uid}`)
      .collection("bloodSugarLevel")
      .doc(`3`)
      .set({
        sugarLevel: sugarLevel,
        senderUid: "doctor",
        senderEmail: currentUser.email,
        sentAt: new Date(),
        appointmentID: "1",
      }); 
      console.log("Hola");
   
      

    //PUSHING BP DATA IN DATABASE
    db.collection("patients")
      .doc(`${patient.uid}`)
      .collection("weight")
      .doc(`3`)
      .set({
        weight: weight,
        senderUid: "doctor",
        senderEmail: currentUser.email,
        sentAt: new Date(),
        appointmentID: "1",
      });

    setWeight("");
    setSugarLevel("");
  })
  };




  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        {patients.map((patient) => {
          if (patient.uid === uid)
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

                    <Button onClick={handleClickOpen}>
        <IconButton  style={{ color: "black" }}>
          <MonitorHeartIcon />
        </IconButton> Actualizar reportes
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">ACTUALIZAR REPORTES</DialogTitle>
        <Divider />
        <DialogContent>
          {/* FORM TO UPDATE REPORTS */}

          <form onSubmit={updateReports}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  id="outlined"
                  required
                  label="Azucar en Sangre (mg/dL)"
                  color="primary"
                  placeholder="Azucar en Sangre (mg/dL))"
                  value={sugarLevel}
                  onChange={(e) => {
                    setSugarLevel(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined"
                  required
                  label="Peso"
                  color="primary"
                  placeholder="Peso (kg)"
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" startIcon={<SendIcon />}>
                  Actualizar
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

                    
                  </Paper>
                </Grid>
                

                {/* PATIENT'S PROFILE */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      height: "100%",
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Title>Perfil</Title>
                    <Typography>Nombre: {patient.name}</Typography>
                    <Typography>Edad: {patient.age}</Typography>
                    <Typography>Genero: {patient.gender}</Typography>
                    <Typography>Grupo Sanguineo: {patient.bloodGroup}</Typography>
                    <Typography>
                      Dirección: {patient.address1}, {patient.address2},{" "}
                      {patient.city}, {patient.state}, {patient.country},{" "}
                      {patient.pincode}
                    </Typography>
                     {/* CHAT CON EL PACIENTE */}

                     <Button  onClick={handleClickOpenMsg}>
                    <IconButton style={{ color: "black" }}>
                      <ChatIcon />
                    </IconButton> MENSAJES
                     </Button>
                  </Paper>
                  {/* CHAT DIALOG BOX */}

      <Dialog
        open={openMsg}
        onClose={handleCloseMsg}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">CHAT</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <List>
              {chats.map((chat) => {
                return (
                  <>
                    <ListItem style={{ margin: "0" }}>
                      <Typography>
                        {chat.senderEmail}
                        <p>
                          <b>{chat.message}</b>
                        </p>
                      </Typography>
                    </ListItem>
                  </>
                );
              })}
            </List>
          </DialogContentText>

          {/* FORM TO SEND MESSAGE */}

          <form onSubmit={sendMessage}>
            <TextField
              id="filled-basic"
              color="primary"
              placeholder="Enter message..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <Button type="submit" startIcon={<SendIcon />} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMsg} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
                   


                </Grid>

                {/* GRAPHS */}
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 500,
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
                      height: 500,
                    }}
                  >
                    <WeightGraph uid={patient.uid} />
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper sx={paper}>
                    <Past_Appointments
                      patientUID={patient.uid}
                      doctorUID={currentUser.uid}
                    />
                  </Paper>
                </Grid>
              </Grid>
            );
        })}
      </Container>
    </>
  );
};

export default Patient;
