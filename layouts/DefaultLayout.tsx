import React, { Children } from "react";
import styled from "styled-components";

import Background from "../toolkit/Background";
import Navbar from "../toolkit/Navbar";

const DefaultContainer = styled.div`
  max-width: 1140px;
  margin: 0 auto;
`;

const Bg = styled.div`
  height: 80vh;
  background: #333;
  position: relative;
`;

let links = [
  {
    title: "Electronics",
    path: "/items/electronics",
    subItems: [
      {
        title: "PS4",
        path: "/items/electronics/ps4",
      },
      {
        title: "Xbox",
        path: "/items/electronics/ps4",
      },
      {
        title: "Switch",
        path: "/items/electronics/ps4",
      },
    ],
  },
  {
    title: "Fashion",
    path: "/items/fashion",
    subItems: [
      {
        title: "Jumpers",
        path: "/items/fashion/jumpers",
      },
    ],
  },
  {
    title: "Home & Garden",
    path: "/items/home&garden",
    subItems: [
      {
        title: "pots",
        path: "/items/home&garden/pots",
      },
    ],
  },
  {
    title: "Jewellery & Beauty",
    path: "/items/jewellery&beauty",
    subItems: [
      {
        title: "Chains",
        path: "/items/jewellery&beauty/chains",
      },
    ],
  },
  {
    title: "Sports & Leisure",
    path: "/items/jewellery&beauty",
    subItems: [
      {
        title: "Chains",
        path: "/items/jewellery&beauty/chains",
      },
    ],
  },
  {
    title: "Films & Books",
    path: "/items/jewellery&beauty",
    subItems: [
      {
        title: "Chains",
        path: "/items/jewellery&beauty/chains",
      },
    ],
  },
  {
    title: "Motors",
    path: "/items/jewellery&beauty",
    subItems: [
      {
        title: "Chains",
        path: "/items/jewellery&beauty/chains",
      },
    ],
  },
];

const DefaultLayout = ({ children }: any) => {
  return (
    <Bg>
      {/* <Background /> */}
      <DefaultContainer>
        <Navbar links={links} />
        {children}
      </DefaultContainer>
    </Bg>
  );
};

export default DefaultLayout;
