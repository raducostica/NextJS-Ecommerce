import React, { useState, FC } from "react";
import Link from "next/link";
import styled from "styled-components";
import Modal from "../../components/Modal/Modal";

type ShowProps = {
  show: boolean;
};

const MainNav = styled.div`
  font-size: 16px;
  color: #fff;
  position: relative;

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

const NavLinks = styled.nav`
  display: flex;
  flex-direction: row;
  position: static;
  min-height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0px 16px;
  background: none;
`;

const StyledUL = styled.ul`
  display: none;

  @media only screen and (min-width: 900px) {
    font-size: 16px;
    display: flex;
    padding: 4px 0;
  }
`;

const StyledMobileUL = styled.ul`
  li {
    list-style: none;
    padding: 8px 8px;
  }

  li:first-of-type {
    padding-bottom: 15px;
  }

  @media only screen and (min-width: 900px) {
    display: none;
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

const NavbarModalContainer = styled.div`
  background: #ffffff;
  color: #000000;
  z-index: 990;
  width: 0;
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  transition: width 0.1s ease-in;
  overflow: hidden;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.16), 0 3px 5px rgba(0, 0, 0, 0.23);

  &.active {
    width: 250px;
    padding: 50px 0 0 0;
  }
`;

const NavSubItems = styled.ul`
  display: none;
  background: #fff;
  position: absolute;
  width: 180px;
  color: #000;
  padding: 8px;
  border-radius: 4px;
  margin-top: 8px;
  right: 0px;
  :hover {
    display: flex;
    flex-direction: column;
  }
`;

const SubItem = styled.li`
  padding: 8px;
`;

const NavLink = styled.li`
  list-style: none;
  position: relative;
  padding: 8px;
  :hover {
    ::after {
      content: "";
      height: 2px;
      width: 80%;
      margin: auto;
      text-align: center;
      background: #fff;
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translate(-50%, 0);
    }
    ${NavSubItems} {
      display: flex;
      flex-direction: column;
    }
  }
`;

type NavbarProps = {
  links: { [key: string]: any }[];
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
      <NavLinks>
        <StyledUL>
          <NavLink>
            <Link href="/">
              <Anchor>Home</Anchor>
            </Link>
          </NavLink>
          {links.map((link, index) => {
            return (
              <NavLink key={index}>
                <Link href={`/items/[slug]`} as={`/items/${link.path}`}>
                  <Anchor>{link.title}</Anchor>
                </Link>
                <NavSubItems>
                  {link.subItems.map((subItem: any, index: number) => {
                    return <SubItem>{subItem.title}</SubItem>;
                  })}
                </NavSubItems>
              </NavLink>
            );
          })}
        </StyledUL>
      </NavLinks>
      <Modal
        selector={"#modal"}
        modalState={show}
        handleOnCloseModal={() => setShow(false)}
      >
        <NavbarModalContainer className={show ? "active" : ""}>
          <StyledMobileUL>
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
                  <Link href={`/items/${link.path}`} as={`/items/${link.path}`}>
                    <Anchor>{link.title}</Anchor>
                  </Link>
                </li>
              );
            })}
          </StyledMobileUL>
        </NavbarModalContainer>
      </Modal>
    </MainNav>
  );
};

export default Navbar;
