import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  Box,
  Paper,
  Link,
  Grid,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import firebase, { db, auth } from "../firebase";
import { box, signupGrid } from "./styles";

const theme = createTheme();

const Patient_Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const history = useHistory();

  // SIGNUP WITH EMAIL AND PASSWORD FUNCTION
  const handleSignup = (e) => {
    e.preventDefault();
    setPasswordError("");
    setEmailError("");
    if (name === "") {
      setNameError("Obligatoria");
      return;
    }
    if (password !== cpassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }

    // CHECK AUTHENTICATION
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        const user = {
          displayName: name,
          email: email,
          password: password,
          uid: cred.user.uid,
        };

        // PUSHING USER DATA IN DB
        const userRef = db.doc(`users/${user.uid}`);
        userRef.set({
          name,
          email,
          createdAt: new Date(),
          uid: user.uid,
        });

        // PUSHING PATIENT DATA IN DB
        const patientRef = db.doc(`patients/${user.uid}`);
        patientRef.set({
          name,
          email,
          imageURL: null,
          uid: user.uid,
          isVerified: "false",
          unreadCount: 1,
        });

        // PUSHING NEW NOTIFICATION
        db.doc(`patients/${cred.user.uid}`).collection("notifications").add({
          message: "Completa tu perfil en la sección dashboard",
          sentAt: new Date(),
        });
      })
      .then(() => {
        history.push(`/patient/dashboard`);
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default:
            break;
        }
      });
  };

  // SIGN UP WITH GOOGLE FUNCTION
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((cred) => {
        //console.log(cred);

        // PUSHING USER DATA IN DB
        const userRef = db.doc(`users/${cred.user.uid}`);
        userRef.set({
          name: cred.user.displayName,
          email: cred.user.email,
          createdAt: new Date(),
          uid: cred.user.uid,
        });

        // PUSHING PATIENT DATA IN DB
        const patientRef = db.doc(`patients/${cred.user.uid}`);
        patientRef.set({
          name: cred.user.displayName,
          email: cred.user.email,
          uid: cred.user.uid,
          isVerified: "false",
          imageURL: null,
          unreadCount: 1,
        });

        // PUSHING NEW NOTIFICATION
        db.doc(`patients/${cred.user.uid}`).collection("notifications").add({
          message: "Completa tu perfil en la sección dashboard",
          sentAt: new Date(),
        });
      })
      .then(() => {
        history.push("patient/dashboard");
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={signupGrid} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={box}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
              Registro para pacientes
            </Typography>
            <Box component="form" noValidate onSubmit={handleSignup}>
              {/* ERROR ALERTS */}
              {nameError && <Alert severity="error">{nameError}</Alert>}
              {emailError && <Alert severity="error">{emailError}</Alert>}
              {passwordError && <Alert severity="error">{passwordError}</Alert>}
              <br />

              <Grid container spacing={1}>
                <Grid item xs={12}>
                  {/* NAME TEXTFIELD */}
                  <TextField
                    name="Name"
                    required
                    fullWidth
                    id="Name"
                    label="Nombre completo"
                    value={name}
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                    error={nameError}
                  />
                </Grid>

                {/* EMAIL TEXTFIELD */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailError}
                  />
                </Grid>

                {/* PASSWORD TEXTFIELD */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    // type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError}
                  />
                </Grid>

                {/* CONFIRM PASSWORD TEXTFIELD */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Confirmar Contraseña"
                    type="password"
                    id="cpassword"
                    autoComplete="confirm-password"
                    value={cpassword}
                    // type="password"
                    onChange={(e) => setCPassword(e.target.value)}
                  />
                </Grid>
              </Grid>

              {/* SIGN UP BUTTON */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 1 }}
              >
                Registrarse
              </Button>

              <Typography
                component="h1"
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                O
              </Typography>

              {/* SIGN UP WITH GOOGLE */}
              <Grid item xs={12}>
                <Button
                  variant="outline"
                  fullWidth
                  // variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                  startIcon={<GoogleIcon />}
                  onClick={() => signInWithGoogle()}
                >
                  Registrarse con Google
                </Button>
              </Grid>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/patient_signin" variant="body2">
                    Ya tenes una cuenta? Ingresar
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Patient_Signup;
