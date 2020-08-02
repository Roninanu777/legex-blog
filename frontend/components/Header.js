import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { signout, isAuth } from "../actions/auth";
import logo from "./legex-logo.webp";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

const getName = (name) => {
  let regex = /\w+/i;
  let firstName = name.match(regex);
  return firstName[0];
};

const navStyles = { 
  display: 'flex', 
  boxShadow: '0px 1px 8px 0px rgba(168,168,168,1)', 
  justifyContent: 'center',
  fontFamily: "'Lato', sans-serif",
  fontSize: '1.2rem'
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={navStyles}>
      <Navbar style={{width: '65%'}} color="light" light expand="md">
        <NavbarBrand style={{ cursor: "pointer" }}>
          <Link href="/">
            <img src={logo} alt="legex-logo" />
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link href="/blogs">
                <NavLink style={{ cursor: "pointer" }}>Blogs</NavLink>
              </Link>
            </NavItem>

            {!isAuth() && (
              <React.Fragment>
                <NavItem>
                  <Link href="/signin">
                    <NavLink style={{ cursor: "pointer" }}>Signin</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signup">
                    <NavLink style={{ cursor: "pointer" }}>Signup</NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}

            {isAuth() && (
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  onClick={() => signout(() => Router.replace(`/signin`))}
                >
                  Signout
                </NavLink>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link href="/user">
                  <NavLink style={{ cursor: "pointer" }}>`{getName(isAuth().name)}'s Dashboard`</NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link href="/admin">
                  <NavLink style={{ cursor: "pointer" }}>
                    {getName(isAuth().name)}'s Dashboard
                  </NavLink>
                </Link>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
