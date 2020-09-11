import React, { useState, FC } from "react";
import Link from "next/link";
import styled from "styled-components";

type ShowProps = {
  show: boolean;
};

const MainNav = styled.div`
  font-size: 16px;
  color: #fff;

  @media only screen and (min-width: 900px) {
    font-size: 18px;
  }
`;

const NavContainer = styled.div`
  position: relative;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (min-width: 1040px) {
    padding: 16px 0;
  }
`;

const Logo = styled.div``;

const NavLinks = styled.nav<ShowProps>`
  min-height: 100vh;
  top: 0;
  right: 0;
  width: 200px;
  position: absolute;
  display: ${({ show }) => (show ? "flex" : "none")};
  padding: ${({ show }) => (show ? "50px 0 0 0" : "0")};
  background: #ffffff;
  color: #000000;
  z-index: 998;

  @media only screen and (min-width: 900px) {
    display: flex;
    flex-direction: row;
    position: static;
    min-height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 0px 16px;
    background: none;
  }
`;

const StyledUL = styled.ul`
  font-size: 14px;
  li {
    list-style: none;
    padding: 12px 20px;
  }

  @media only screen and (min-width: 900px) {
    font-size: 16px;
    display: flex;
    li {
      padding: 0 10px;
    }
    li:first-of-type {
      display: none;
    }
  }
`;

const Anchor = styled.a`
  color: #000000;
  cursor: pointer;
  @media only screen and (min-width: 900px) {
    color: #ffffff;
  }
`;

const Burger = styled.div`
  height: 20px;
  width: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
  @media only screen and (min-width: 900px) {
    display: none;
  }
`;

const Line = styled.div<ShowProps>`
  height: 3px;
  width: 100%;
  background: ${({ show }) => (show ? "#000000" : "#ffffff")};
  :not(:last-of-type) {
    margin-bottom: 3px;
  }
`;

const SignIn = styled.div`
  display: none;
  @media only screen and (min-width: 900px) {
    display: block;
  }
`;

type NavbarProps = {
  links: string[];
};

const Navbar: FC<NavbarProps> = ({ links }) => {
  const [show, setShow] = useState(false);

  return (
    <MainNav>
      <NavContainer>
        <div>Logo</div>
        <SignIn>
          <Link href="/auth/signin" as="/auth/signin">
            <Anchor>Sign In</Anchor>
          </Link>
        </SignIn>
        <Burger onClick={() => setShow(!show)}>
          <Line show={show} />
          <Line show={show} />
          <Line show={show} />
        </Burger>
      </NavContainer>
      <NavLinks show={show}>
        <StyledUL>
          <li>
            <Link href="/auth/signin" as="/auth/signin">
              <Anchor>Sign In</Anchor>
            </Link>
          </li>
          <li>
            <Link href="/">
              <Anchor>Home</Anchor>
            </Link>
          </li>
          {links.map((link, index) => {
            return (
              <li key={index}>
                <Link
                  href={`/${link.split(" ").join("")}`}
                  as={`/${link.split(" ").join("")}`}
                >
                  <Anchor>{link}</Anchor>
                </Link>
              </li>
            );
          })}
        </StyledUL>
      </NavLinks>
    </MainNav>
  );
};

export default Navbar;
