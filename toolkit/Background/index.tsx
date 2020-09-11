import React from "react";
import styled from "styled-components";

const StyledBG = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 80vh;
  background: #333;
  width: 100%;
  transform: skewY(20deg);
  transform-origin: top right;
  z-index: -1;

  @media only screen and (min-width: 840px) {
    height: 100vh;
  }
`;

const Background = () => {
  return <StyledBG />;
};

export default Background;
