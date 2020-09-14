import React from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
`;

const StyledButton = styled.button`
  background: red;
  border: none;
  outline: none;
  padding: 12px;
  cursor: pointer;
`;

const StyledFormSection = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: 20px;
  :first-of-type {
    margin-top: 0;
  }
  :last-of-type {
    margin-bottom: 16px;
  }
  :only-of-type {
    margin-bottom: 0;
  }
`;

const MyStyledForm = ({ children, ...props }: any) => {
  return <StyledForm {...props}>{children}</StyledForm>;
};

MyStyledForm.inputSection = ({ children }: any) => {
  return <StyledFormSection>{children}</StyledFormSection>;
};

MyStyledForm.button = ({ children, ...props }: any) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default MyStyledForm;
