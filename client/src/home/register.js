import * as React from "react";
import {
  Button,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { boldRaleway, button, cardMedia, raleway } from "./styles";

const Register = () => {
  return (
    <Grid container spacing={4} id="register">
      {/* REGISTER AS DOCTOR */}
      <Grid item xs={12} md={6}>
        <CardActionArea component="a" href="#">
          <Card sx={{ display: "flex" }}>
            <CardContent sx={{ flex: 1, fontFamily: "Raleway" }}>
              <Typography component="h1" variant="h4" sx={boldRaleway}>
                Registrarse como doctor
              </Typography>
              <Typography variant="h5" paragraph sx={raleway}>
                Administrá tus tiempos, defini tus horarios y cobrá en tiempo real
              </Typography>
              <Button sx={button} href="/doctor_signup">
                Registrarse
              </Button>

              <Button sx={button} href="/doctor_signin">
                Login
              </Button>
            </CardContent>

            {/* Image */}
            <CardMedia
              component="img"
              sx={cardMedia}
              image="images/doctor.jpg"
              alt="Doctor"
            />
          </Card>
        </CardActionArea>
      </Grid>

      {/* REGISTER AS PATIENT */}
      <Grid item xs={12} md={6}>
        <CardActionArea component="a" href="#">
          <Card sx={{ display: "flex" }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h1" variant="h4" sx={boldRaleway}>
                Registrarse como paciente
              </Typography>
              <Typography variant="h5" paragraph sx={raleway}>
                Elegí entre más de 600 doctores, chatea cuando quieras, paga online
              </Typography>
              <Button sx={button} href="/patient_signup">
                Registrarse
              </Button>

              <Button sx={button} href="/patient_signin">
                Login
              </Button>
            </CardContent>

            {/* Image */}
            <CardMedia
              component="img"
              sx={cardMedia}
              image="images/patient.jpg"
              alt="Patient"
            />
          </Card>
        </CardActionArea>
      </Grid>

      {/* ADMIN LOGIN */}
      <Grid item xs={12}>
        <CardActionArea component="a" href="#">
          <Card sx={{ display: "flex" }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h1" variant="h4" sx={boldRaleway}>
                Acceso para admins
              </Typography>
              <Typography variant="h5" paragraph sx={raleway}>
                Solo los administradores de Vita pueden acceder a esta sección
              </Typography>

              <Button sx={button} href="/admin_signin">
                Login
              </Button>
            </CardContent>

            {/* Image */}
            <CardMedia
              component="img"
              sx={cardMedia}
              image="images/admin.jpg"
              alt="Admin"
            />
          </Card>
        </CardActionArea>
      </Grid>
    </Grid>
  );
};

export default Register;
