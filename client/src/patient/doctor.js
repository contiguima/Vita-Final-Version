import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar";
import { db } from "../firebase";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Book_Appointment from "./book_appointment";
import { container, paper, typography } from "./styles";
import Ratings from "../doctor/ratings";
import Reviews from "../doctor/reviews";
import {
  IconButton,
  TextField,
  Dialog, 
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  Divider,
  Tooltip,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "../contexts/AuthContext";

const Doctor = () => {
  const { currentUser } = useAuth();
  const [patients, setPatients] = useState([]);


  //CHATS
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  //FUNCTIONS TO OPEN AND CLOSE DIALOG BOX
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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

  //FETCHING ALL MESSAGES FROM DATABASE
  useEffect(() => {
    db.collection(`meetings/1/chats`)
      .orderBy("sentAt", "asc")
      .onSnapshot((snapshot) => {
        setChats(snapshot.docs.map((doc) => doc.data()));
      });
  }, [`1`]);




  const [doctors, setDoctors] = useState([]);
  const location = useLocation();
  const uid = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  // FETCHING PATIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("doctors").onSnapshot((snapshot) => {
      setDoctors(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div>
      <Navbar />
      <Container maxWidth="false" sx={container}>
        {doctors.map((doctor) => {
          if (doctor.uid === uid)
            return (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography align="center" variant="h4" sx={typography}>
                    {doctor.name}
                  </Typography>
                </Grid> 

                {/* AVATAR */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper sx={paper}>
                    <Avatar
                      alt="Doctor's Profile Picture"
                      src={doctor.imageURL}
                      sx={{ width: 100, height: 100, m: 2 }}
                    />
                    <Book_Appointment
                      doctorUID={uid}
                      startTime={doctor.startTime}
                      endTime={doctor.endTime}
                    />

                    {/* MENSAJERIA */}
                    <Button onClick={handleClickOpen}>
        <IconButton  style={{ color: "black" }}>
          <ChatIcon />
        </IconButton> MENSAJES
      </Button>
                  </Paper>
                </Grid>

                 {/* CHAT DIALOG BOX */}

      <Dialog
        open={open}
        onClose={handleClose}
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
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

                {/* PROFILE */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper sx={paper}>
                    <>
                      <Typography>Nombre: {doctor.name}</Typography>

                      <Typography>
                        Especialidad médica: {doctor.medicalSpeciality}
                      </Typography>
                      <Typography>
                        Honorarios: {doctor.experience}$
                      </Typography>
                      <Typography>Edad: {doctor.age} años</Typography>
                      <Typography>Género: {doctor.gender}</Typography>
                      <Typography>Títulos: {doctor.degree}</Typography>
                      <Typography>
                        Dirección del consultorio: {doctor.address1}, {doctor.address2},{" "}
                        {doctor.city}, {doctor.state}, {doctor.country},{" "}
                        {doctor.pincode}
                      </Typography>
                      <Typography>
                        Horarios de atención :{" "}
                        {new Date(doctor.startTime.seconds * 1000).getHours()}:
                        {new Date(doctor.startTime.seconds * 1000).getMinutes()}
                         - {new Date(doctor.endTime.seconds * 1000).getHours()}
                        :{new Date(doctor.endTime.seconds * 1000).getMinutes()}
                        hrs
                      </Typography>
                    </>
                  </Paper>
                </Grid>

                {/* RATINGS */}
                <Grid item xs={12}>
                  <Ratings uid={doctor.uid} />
                </Grid>

                {/* REVIEWS */}
                <Grid item xs={12}>
                  <Reviews uid={doctor.uid} />
                </Grid>
              </Grid>
            );
        })}
      </Container>
    </div>
  );
};

export default Doctor;
