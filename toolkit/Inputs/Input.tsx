import styled from "styled-components";
import { FC, useState, useEffect } from "react";
import Icon from "../Icon/Icon";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";

const StyledInputContainer = styled.div<{ error: boolean }>`
  border-radius: 4px;
  width: 100%;
  display: flex;
  flex-direction: ${({ error }) => (error ? "column" : "row")};
  justify-content: center;
  min-height: 50px;
`;

const StyledLabel = styled.label`
  font-size: 14px;
  text-transform: capitalize;
  margin-bottom: 4px;
`;

const StyledIcon = styled.div`
  background: #fff;
  padding: 0 8px;
  font-size: 25px;
  display: flex;
  align-items: center;
  background: yellow;
  border: 1px solid #333;
`;

const allInputs = (props: any) => {
  const MyInputs: { [key: string]: JSX.Element } = {
    TextInput: <TextInput {...props} />,
    SelectInput: <SelectInput {...props} />,
  };

  return MyInputs[props.renderType];
};

const Input: FC = ({ label, iconName, ...props }: any) => {
  return (
    <>
      {(label as boolean) && <StyledLabel>{props.name}</StyledLabel>}
      <StyledInputContainer error={props.error}>
        {allInputs(props)}
        {iconName && (
          <StyledIcon>
            <Icon iconName={iconName} />
          </StyledIcon>
        )}
      </StyledInputContainer>
    </>
  );
};

export default Input;
