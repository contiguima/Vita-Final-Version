import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Alert,
  Button,
  Grid,
  Box,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import Title from "./title";

import { db } from "../../firebase";

const theme = createTheme();

const Complete_Details = (props) => {
  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [nameError, setNameError] = useState("");
  const [bloodGroupError, setBloodGroupError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [countryError, setCountryError] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError("");
    setAgeError();
    setGenderError("");
    setCityError("");
    setStateError("");
    setPincodeError();
    setCountryError("");

    if (name === "") {
      setNameError("Obligatorio");
      return;
    }
    if (bloodGroup === "") {
      setBloodGroupError("Obligatorio");
    }
    if (age === "") {
      setAgeError("Obligatorio");
      return;
    }
    if (gender === "") {
      setGenderError("Obligatorio");
      return;
    }
    if (address1 === "" || address2 === "") {
      setAddressError("Obligatorio");
    }
    if (city === "") {
      setCityError("Obligatorio");
      return;
    }
    if (state === "") {
      setStateError("Obligatorio");
      return;
    }
    if (pincode === "") {
      setPincodeError("Obligatorio");
      return;
    }
    if (country === "") {
      setCountryError("Obligatorio");
      return;
    }

    //PUSHING USER DATA IN DATABASE
    const patientRef = db.doc(`patients/${props.uid}`);
    patientRef.set({
      uid: props.uid,
      name,
      bloodGroup,
      age,
      gender,
      address1,
      address2,
      city,
      state,
      country,
      pincode,
      imageURL: null,
      isVerified: "true",
      unreadCount: 0,
      updatedAt: new Date(),
    });

    history.push("/patient/profile");
  };

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {nameError && <Alert severity="error">{nameError}</Alert>}
          {ageError && <Alert severity="error">{ageError}</Alert>}
          {genderError && <Alert severity="error">{genderError}</Alert>}
          {addressError && <Alert severity="error">{addressError}</Alert>}
          {cityError && <Alert severity="error">{cityError}</Alert>}
          {stateError && <Alert severity="error">{stateError}</Alert>}
          {countryError && <Alert severity="error">{countryError}</Alert>}
          {pincodeError && <Alert severity="error">{pincodeError}</Alert>}
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Title>Completar/Editar tus detalles</Title>
              <Typography variant="subtitle1" gutterBottom>
                Los cambios se reflejaran en tu perfil
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="Name"
                name="Name"
                label="Nombre completo"
                fullWidth
                size="small"
                onChange={(e) => setName(e.target.value)}
                error={nameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="Blood Group"
                name="Blood Group"
                label="Grupo Sanguineo"
                fullWidth
                size="small"
                onChange={(e) => setBloodGroup(e.target.value)}
                error={bloodGroupError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="age"
                name="age"
                label="Edad (en años)"
                fullWidth
                autoComplete="age"
                size="small"
                onChange={(e) => setAge(e.target.value)}
                error={ageError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="gender"
                name="gender"
                label="Género"
                fullWidth
                select
                autoComplete="gender"
                size="small"
                onChange={handleChangeGender}
                error={genderError}
              >
                <MenuItem value="Femenino">Femenino</MenuItem>
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Dirección 1"
                fullWidth
                autoComplete="shipping address-line1"
                size="small"
                onChange={(e) => setAddress1(e.target.value)}
                error={addressError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="address2"
                name="address2"
                label="Dirección 2"
                fullWidth
                autoComplete="shipping address-line2"
                size="small"
                onChange={(e) => setAddress2(e.target.value)}
                error={addressError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="Ciudad"
                fullWidth
                autoComplete="shipping address-level2"
                size="small"
                onChange={(e) => setCity(e.target.value)}
                error={cityError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="state"
                name="state"
                label="Provincia"
                fullWidth
                size="small"
                onChange={(e) => setState(e.target.value)}
                error={stateError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="zip"
                label="Código Postal"
                fullWidth
                autoComplete="shipping postal-code"
                size="small"
                onChange={(e) => setPincode(e.target.value)}
                error={pincodeError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="País"
                fullWidth
                autoComplete="shipping country"
                size="small"
                onChange={(e) => setCountry(e.target.value)}
                error={countryError}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Actualizar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </ThemeProvider>
  );
};

export default Complete_Details;
