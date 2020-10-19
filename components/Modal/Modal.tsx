import styled from "styled-components";
import React, { useEffect, useState } from "react";
import ModalPortal from "./ModalPortal";
import Icon from "../../toolkit/Icon/Icon";

const ModalContainer = styled.div`
  background: #fff;
  padding: 8px;
  z-index: 1;
  position: relative;
  height: auto;
  width: 560px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  z-index: 999;
`;

const StyledLogo = styled.div`
  font-size: 18px;
`;

const ModalContent = styled.div`
  padding-top: 16px;
`;

const Modal = (props: any) => {
  return (
    <>
      {props.modalState && (
        <ModalPortal selector={props.selector}>
          <ModalOverlay>
            <IconContainer onClick={props.handleOnCloseModal}>
              <Icon iconName="CLOSE" />
            </IconContainer>
            {props.children}
          </ModalOverlay>
        </ModalPortal>
      )}
    </>
  );
};

export default Modal;
