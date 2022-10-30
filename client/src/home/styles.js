// NAVBAR SECTION

export const titleToolbar = {
  borderBottom: 1,
  borderColor: "divider",
  backgroundColor: "#fff",
  color: "#3e8fda",
};

export const title = {
  flex: 1,
  fontFamily: "Montserrat",
};

export const navbarToolbar = {
  justifyContent: "space-between",
  overflowX: "auto",
  backgroundColor: "#fff",
};

export const link = {
  p: 1,
  flexShrink: 0,
  textDecoration: "none",
  color: "#3e8fda",
  fontWeight: "bold",
  textTransform: "uppercase",
  fontFamily: "Montserrat",
  "&:hover": {
    backgroundColor: "#c5d3eb",
    color: "#ffffff",
  },
};

// HEADER SECTION

export const headerPaper = {
  position: "relative",
  backgroundColor: "grey.800",
  color: "#fff",
  mb: 4,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundImage: `url('images/home.jpg')`,
};

export const headerBox = {
  position: "relative",
  p: { xs: 3, md: 6 },
  pr: { md: 0 },
};

export const raleway = {
  fontFamily: "Montserrat",
};

// REGISTER SECTION

export const button = {
  backgroundColor: "#3e8fda",
  color: "#ffffff",
  margin: "1%",
  fontFamily: "Montserrat",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#d7e8f4",
    color: "#3284be",
  },
};

export const cardMedia = {
  width: 160,
  display: { xs: "none", sm: "block" },
};

export const boldRaleway = {
  fontFamily: "Montserrat",
  fontWeight: "bold",
};

// ABOUT SECTION

export const description = {
  fontFamily: "Montserra",
  marginBottom: "3vh",
};

export const aboutPaper = {
  position: "relative",
  backgroundColor: "grey.800",
  color: "#fff",
  mb: 4,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundImage: `url('images/doctors.jpg')`,
};

export const box = {
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  backgroundColor: "rgba(0,0,0,.3)",
};

export const subtitle = {
  fontFamily: "Montserrat",
  fontWeight: "bold",
  fontStyle: "italic",
};

// TESTIMONIALS SECTION

export const message = {
  fontFamily: "Raleway",
  fontStyle: "italic",
};

export const testimonialsTitle = {
  fontFamily: "Raleway",
  paddingBottom: "2%",
  fontStyle: "italic",
  fontWeight: "bold",
};

export const card = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

// FOOTER SECTION

export const footerBox = {
  py: 1,
  backgroundColor: "#3284be",
  color: "#ffffff",
};

export const iconButton = {
  color: "#ffffff",
  "&:hover": { fontWeight: "bold" },
};

export const footerTitle = {
  mt: 1,
  fontFamily: "Raleway",
  fontWeight: "bold",
};

export const sendButton = {
  color: "#3284be",
  backgroundColor: "#ffffff",
  fontFamily: "Raleway",
  fontWeight: "bold",
};
