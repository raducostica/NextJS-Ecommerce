import { FC, useEffect } from "react";
import styled from "styled-components";

const StyledFormError = styled.div`
  font-size: 12px;
  color: red;
  height: 12px;
`;

const StyledInput = styled.input`
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

const TextInput: FC = (props: any) => {
  const { state, setState, isSubmitBtnDisabled, index } = props;

  useEffect(() => {
    let check = props.minOrNoofChoices
      ? props.value.length >= props.minOrNoofChoices
      : props.value.length > 1;

    if (check) {
      isSubmitBtnDisabled(true, index);
    } else {
      isSubmitBtnDisabled(false, index);
    }
  }, [props.value]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let newInputs = [...state];
    newInputs[index] = {
      ...newInputs[index],
      value: event.target.value,
    };
    setState(newInputs);
  };

  const handleFocusIn = (index: number) => {
    let newInputs = [...state];
    if (typeof newInputs[index].focus !== "undefined") {
      newInputs[index] = {
        ...newInputs[index],
        focus: false,
      };
      setState(newInputs);
    }
  };

  const handleFocusOut = (index: number) => {
    let newInputs = [...state];
    if (typeof newInputs[index].focus !== "undefined") {
      newInputs[index] = {
        ...newInputs[index],
        focus: true,
      };
      setState(newInputs);
    }
  };

  return (
    <>
      <StyledInput
        onChange={(e) => handleChange(e, index)}
        onFocus={() => handleFocusIn(index)}
        onBlur={() => handleFocusOut(index)}
        {...props}
      />
      <StyledFormError>
        {props.min === 0 && props.focus && props.error && (
          <span>
            {props.name.toUpperCase()} must be atleast {props.min} characters
            long
          </span>
        )}
        {props.minOrNoofChoices
          ? props.value.length < props.minOrNoofChoices &&
            props &&
            props.focus &&
            props.error && (
              <span>
                {props.name.toUpperCase()} must be atleast{" "}
                {props.minOrNoofChoices} characters long
              </span>
            )
          : props.focus &&
            props.error &&
            props.value.length <= 1 && (
              <span>{props.name.toUpperCase()} must be filled out</span>
            )}
      </StyledFormError>
    </>
  );
};

export default TextInput;
