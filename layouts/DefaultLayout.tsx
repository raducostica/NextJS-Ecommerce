import React, { Children } from "react";
import styled from "styled-components";

import Background from "../toolkit/Background";
import Navbar from "../toolkit/Navbar";

const DefaultContainer = styled.div`
  max-width: 1040px;
  margin: 0 auto;
`;

let links = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Jewellery & Beauty",
  "Sports & Leisure",
  "Films & Books",
  "Motors",
];

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Background />
      <DefaultContainer>
        <Navbar links={links} />
        {children}
      </DefaultContainer>
    </div>
  );
};

export default DefaultLayout;
