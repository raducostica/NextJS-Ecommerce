import styled from "styled-components";
import { FC, useState, useEffect } from "react";
import Icon from "../Icon/Icon";

const StyledInputContainer = styled.div`
  border-radius: 4px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

const StyledInput = styled.input`
  height: 100%;
  flex: 1;
  padding-left: 12px;
  font-size: 14px;
  ::-webkit-input-placeholder {
    text-transform: capitalize;
  }

  :-ms-input-placeholder {
    text-transform: capitalize;
  }

  ::placeholder {
    text-transform: capitalize;
  }
`;

const StyledLabel = styled.label`
  font-size: 14px;
  text-transform: capitalize;
  margin-bottom: 4px;
`;

const StyledFormError = styled.div`
  font-size: 12px;
  color: red;
  height: 12px;
`;

const StyledIcon = styled.div`
  background: #fff;
  padding: 0 8px;
  font-size: 25px;
  height: 100%;
  display: flex;
  align-items: center;
  background: yellow;
`;

const allInputs = (props: any) => {
  const MyInputs: { [key: string]: JSX.Element } = {
    TextInput: (
      <StyledInput
        onChange={(e) => props.handleChange(e, props.index)}
        onFocus={() => props.handleFocusIn(props.index)}
        onBlur={() => props.handleFocusOut(props.index)}
        {...props}
      />
    ),
    SelectInput: <div>Hello</div>,
  };

  return MyInputs[props.renderType];
};

const Input: FC = (props: any) => {
  console.log(props);
  return (
    <>
      {props.label && <StyledLabel>{props.name}</StyledLabel>}
      <StyledInputContainer>
        {allInputs(props)}
        {props.iconName && (
          <StyledIcon>
            <Icon iconName={props.iconName} />
          </StyledIcon>
        )}
      </StyledInputContainer>
      <StyledFormError>
        {props.min &&
          props.value.length < props.min &&
          props &&
          props.focus &&
          props.error && (
            <span>
              {props.name.toUpperCase()} must be atleast {props.min} characters
              long
            </span>
          )}
      </StyledFormError>
    </>
  );
};

export default Input;
