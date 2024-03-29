import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {DesktopDateTimePicker} from "@mui/x-date-pickers/DesktopDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Stack from '@mui/material/Stack';
const Book_Appointment = (props) => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("");
  const [mode, setMode] = useState("");
  const [timeSlot, setTimeSlot] = useState(new Date());
  const [symptoms, setSymptoms] = useState("");
  const [timeError, setTimeError] = useState("");
  const { currentUser } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
    setScroll("paper");
    setTimeError("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleChangeTimeSlot = (e) => {
    setTimeSlot(e.target.value);
    if (
      timeSlot.getHours() <
        new Date(props.startTime.seconds * 1000).getHours() ||
      timeSlot.getHours() > new Date(props.endTime.seconds * 1000).getHours()
    ) {
      setTimeError("Por favor elegí un horario dentro de los horarios del doctor!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      timeSlot.getHours() <
        new Date(props.startTime.seconds * 1000).getHours() ||
      timeSlot.getHours() > new Date(props.endTime.seconds * 1000).getHours()
    ) {
      setTimeError("Por favor elegí un horario dentro de los horarios del doctor!");
    } else {
      // PUSHING APPOINTMENT DATA IN DB
      db.collection("appointments").add({
        mode: mode,
        timeSlot: timeSlot,
        symptoms: symptoms,
        isConfirmed: "pending",
        doctorUID: props.doctorUID,
        patientUID: currentUser.uid,
        bookedAt: new Date(),
      });

      setOpen(false);
    }
  };

  // console.log(timeSlot.getDay());
  // console.log(new Date(props.startTime.seconds * 1000).getDay());
  // console.log(new Date(props.endTime.seconds * 1000).getDay());

  return (
    <>
      <Button variant="contained" onClick={() => handleClickOpen()}>
        Sacar turno
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps={{ sx: { position: "fixed", top: 0, m: 0 } }}
      >
        <DialogTitle id="scroll-dialog-title">Sacar turno</DialogTitle>
        <form onSubmit={handleSubmit}>
          {timeError && <Alert severity="error">{timeError}</Alert>}
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <Grid container spacing={1}>
                {/* MODE OF CONSULTATION */}
                <Grid item xs={12}>
                  <TextField
                    required
                    id="mode"
                    name="mode"
                    label="Tipo de consulta"
                    fullWidth
                    size="small"
                    select
                    onChange={(e) => setMode(e.target.value)}
                  >
                    <MenuItem value="Online">Online</MenuItem>
                    <MenuItem value="Offline">En consultorio</MenuItem>
                    <MenuItem value="mensaje">Enviar mensaje</MenuItem>

                  </TextField>
                </Grid>

                {/* DATE AND TIME SLOT */}
                <Grid item xs={12}>
                  <Typography>Fecha y horario preferidos</Typography>
                </Grid>

                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDateTimePicker
                      value={timeSlot}
                      onChange={(newValue) => {
                        setTimeSlot(newValue);
                      }} 
                      renderInput={(params) => (
                        <TextField
                          required
                          id="timeSlot"
                          name="timeSlot"
                          fullWidth
                          size="small"
                    
                          onChange={(e) => handleChangeTimeSlot()}
                          {...params}
                        />
                      )}
                    />
                     
                  </LocalizationProvider>
                </Grid>
               
                {/* SYMPTOMS */}
                <Grid item xs={12}>
                  <TextField
                    id="symptoms"
                    name="symptoms"
                    label="Sintomas"
                    fullWidth
                    size="small"
                    onChange={(e) => setSymptoms(e.target.value)}
                  />
                </Grid>
                 {/* Pago */}
                <Grid item xs={12}>
                  <TextField
                    
                    
                    label="Método de pago"
                    fullWidth
                    size="small"
                    select
                    
                  />
                  <MenuItem>Débito</MenuItem>
                    <MenuItem>Crédito</MenuItem>
                    <MenuItem>Mercado Pago</MenuItem>
                    <MenuItem>De Pay</MenuItem>
                </Grid>
                <Grid item xs={12}>
                <TextField
                    label="Número de tarjeta"
                    fullWidth
                    size="small"
                    type= "number"
                    
                  />
                </Grid>

              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()}>Cancelar</Button>
            <Button type="submit">Agendar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Book_Appointment;
