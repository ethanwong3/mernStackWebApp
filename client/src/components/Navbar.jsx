import React, { useState } from "react";
import styled from "styled-components";
import LogoImg from "../utils/Images/Logo.png";
import { Link as LinkR, NavLink } from "react-router-dom";
import { MenuRounded } from "@mui/icons-material";
//import { Avatar } from "@mui/material";
//import { useDispatch } from "react-redux";
//import { logout } from "../redux/reducers/userSlice";
// position: sticky // keeps it at top of page when scrolling
const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 20};
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

const NavLogo = styled(LinkR)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 6px;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
`;

const Logo = styled.img`
  height: 42px;
`;

// hamburger icon only visible on smaller screens
const Mobileicon = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

// for smaller screens we dont want to see the nav links
// ul // unordered list
const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

// hover // style to be used when cursor hovers
// active // style to be used when on page
const Navlink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 1s slide-in;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom: 1.8px solid ${({ theme }) => theme.primary};
  }
`;

// mobile icon is hamburger menu
// inherit // implies that component inherits parent components color
const Navbar = () => {
  return (
    <Nav>
      <NavContainer>
        <Mobileicon>
          <MenuRounded sx={{ color: "inherit" }} />
        </Mobileicon>

        <NavLogo to="/">
          <Logo src={LogoImg} />
          Fittrack
        </NavLogo>

        <NavItems>
          <Navlink to="/">Dashboard</Navlink>
          <Navlink to="/workouts">Workouts</Navlink>
          <Navlink to="/tutorials">Tutorials</Navlink>
          <Navlink to="/blogs">Blogs</Navlink>
          <Navlink to="/contact">Contact</Navlink>
        </NavItems>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
