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
import firebase, { auth } from "../firebase";
import { box, signinGrid } from "./styles";

//Comentada linea 147
const theme = createTheme();

const Doctor_Signin = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // SIGN IN WITH EMAIL AND PASSWORD FUNCTION
  const handleSignin = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      return setEmailError("Obligatorio");
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/doctor/profile");
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/user-not-found":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default:
            break;
        }
      });
  };

  // SIGN IN WITH GOOGLE FUNCTION
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        history.push("doctor/profile");
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={signinGrid} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={box}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
              Login para doctores
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSignin}
              sx={{ mt: 1 }}
            >
              {/* ERROR ALERTS */}
              {emailError && <Alert severity="error">{emailError}</Alert>}
              {passwordError && <Alert severity="error">{passwordError}</Alert>}

              {/* EMAIL TEXTFIELD */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
              />

              {/* PASSWORD TEXTFIELD */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
              />

              {/* SIGN IN BUTTON */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Ingresar
              </Button>

              <Typography
                component="h1"
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                O
              </Typography>

              {/* SIGN IN WITH GOOGLE */}
              <Grid item xs={12}>
                <Button
                  variant="outline"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                  startIcon={<GoogleIcon />}
                  onClick={() => signInWithGoogle()}
                >
                  Ingresar con Google
                </Button>
              </Grid>

              <Grid container>
                <Grid item xs>
                 
                </Grid>
                <Grid item>
                  <Link href="/doctor_signup" variant="body2">
                    {"No tenes cuenta en Vita? Registrate"}
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

export default Doctor_Signin;
