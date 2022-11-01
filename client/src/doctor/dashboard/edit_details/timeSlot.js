import React, { useState, useEffect, useRef } from "react";
import { db } from "../../../firebase";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  TextField,
} from "@mui/material";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// // import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import TimePicker from "@mui/lab/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import EditIcon from "@mui/icons-material/Edit";

const TimeSlot = (props) => {
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStartTimeChange = (newValue) => {
    setStartTime(newValue);
  };

  const handleEndTimeChange = (newValue) => {
    setEndTime(newValue);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("doctors").doc(props.uid).update({
      startTime: startTime,
      endTime: endTime,
      updatedAt: new Date(),
    });
    setOpen(false);
  };

  return (
    <>
      <Button startIcon={<EditIcon />} onClick={handleClickOpen}></Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { position: "fixed", top: 200, m: 0 } }}
      >
        <DialogTitle>Editar horarios</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
              <Grid container spacing={1}>
                {/* EDIT START TIME */}
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="Horario de entrada"
                      value={startTime}
                      onChange={handleStartTimeChange}
                      renderInput={(params) => (
                        <TextField
                          required
                          id="StartTime"
                          name="StartTime"
                          label="Horario de entrada"
                          fullWidth
                          size="small"
                          {...params}
                          onChange={(e) => setStartTime(e.target.value)}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                {/* EDIT END TIME */}
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="Horario de salida"
                      value={endTime}
                      onChange={handleEndTimeChange}
                      renderInput={(params) => (
                        <TextField
                          required
                          id="EndTime"
                          name="EndTime"
                          label="Horario de salida"
                          fullWidth
                          size="small"
                          {...params}
                          onChange={(e) => setEndTime(e.target.value)}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit">Editar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default TimeSlot;
