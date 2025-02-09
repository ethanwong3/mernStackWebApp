import React from "react";
import { useState } from "react";
import styled from "styled-components";
import LogoImage from "../utils/Images/Logo.png";
import AuthImage from "../utils/Images/AuthImage.jpg";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

// @media ... // changes to column flex when screen size minimised
const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  background: ${({ theme }) => theme.bg};
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

// @media .... // changes to non displayed when screen sized minimised
// position: relative // relative to its normal positon ineffective to others
const Left = styled.div`
  flex: 1;
  position: relative;
  @media (max-width: 700px) {
    display: none;
  }
`;

// position: absolute // relative to its nearest positioned ancestor
const Logo = styled.img`
  position: absolute;
  width: 70px;
  top: 40px;
  left: 60px;
  z-index: 10;
`;

// object-fit: cover // maintains original image aspect ratio
const Image = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Right = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 16px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 16px;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

// span // inline (not creating new line) eleemnt (typically used to style specific text regions)
// cusor: pointer // when hover, curosr becomes pointer
const TextButton = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
`;

const Authentication = () => {
  const [login, setLogin] = useState(false);

  return (
    <Container>
      <Left>
        <Logo src={LogoImage} />
        <Image src={AuthImage} />
      </Left>
      <Right>
        {!login ? (
          <>
            <SignIn />
            <Text>
              Don't have an account?{" "}
              <TextButton onClick={() => setLogin(true)}>SignUp</TextButton>
            </Text>
          </>
        ) : (
          <>
            <SignUp />
            <Text>
              Already have an account?{" "}
              <TextButton onClick={() => setLogin(false)}>SignIn</TextButton>
            </Text>
          </>
        )}
      </Right>
    </Container>
  );
};

export default Authentication;
