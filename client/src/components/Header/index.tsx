import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "bootstrap/dist/css/bootstrap.min.css";

import "./style.css";
import { Nav } from "react-bootstrap";

interface IHeader {}

const Header: React.FC<IHeader> = (props) => {
  return (
    <Navbar expand="lg" className="my-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">Prisha Policy</Navbar.Brand> 
        <Navbar.Toggle />
        <Navbar.Collapse className="navbar-collapse">
          <Nav.Link as={Link} to="/" className="mx-4 nav-link">Home</Nav.Link>{" "}
          <Nav.Link as={Link} to="/favourites" className="nav-link">Favourites</Nav.Link>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <span className="avatar">H</span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
