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
  MenuItem,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const Gender = (props) => {
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeGender = (e) => {
    setGender(e.target.value);
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
    db.collection("patients").doc(props.uid).update({
      gender: gender,
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
        PaperProps={{ sx: { position: "fixed", top: 0, m: 0 } }}
      >
        <DialogTitle id="scroll-dialog-title">Editar Genero</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
              <Grid container spacing={1}>
                {/* EDIT GENDER */}
                <Grid item xs={12}>
                  <TextField
                    required
                    id="gender"
                    name="gender"
                    label="Genero"
                    fullWidth
                    select
                    autoComplete="gender"
                    size="small"
                    onChange={handleChangeGender}
                  >
                    <MenuItem value="Female">Femenino</MenuItem>
                    <MenuItem value="Male">Masculino</MenuItem>
                    <MenuItem value="Other">Otro</MenuItem>
                  </TextField>
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

export default Gender;
