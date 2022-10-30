import * as React from "react";
import { Link, Toolbar, Typography } from "@mui/material";
import { link, navbarToolbar, title, titleToolbar } from "./styles";

const Navbar = (props) => {
  const { sections } = props;

  return (
    <React.Fragment id="">
      {/* TITLE */}
      <Toolbar sx={titleToolbar}>
        <img
          style={{ display: "flex" , height: "60px", paddingRight:"20px"}}
          src={process.env.PUBLIC_URL + "images/logovita.jpg"}
          alt="Logo"
        />
        <Typography
          variant="h3"
          color="inherit"
          align="left"
          noWrap
          sx={title}
        >
          Vita
        </Typography>
      </Toolbar>

      {/* LINKS TO VARIOUS SECTIONS */}
      <Toolbar component="nav" variant="dense" sx={navbarToolbar}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="h6"
            href={section.url}
            sx={link}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
};

export default Navbar;
