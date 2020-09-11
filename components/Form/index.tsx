import React, { FC, useState, useContext, Fragment, useEffect } from "react";
import MyStyledForm from "./FormStyles";
import Input from "../../toolkit/Inputs/Input";

type FormProps = {
  initialValues: any[];
  label: boolean;
  buttonText?: string;
  handleSubmit: (...args: any) => void;
};

const Form: FC<FormProps> = ({
  initialValues,
  buttonText,
  handleSubmit,
  label,
}) => {
  const [state, setState] = useState(initialValues);

  useEffect(() => {
    setState(initialValues);
  }, [initialValues]);

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

  const checkBtnDisabled = () => {
    const check = state.map((input) => {
      if (input.min && input.value.length < input.min) return false;
      return true;
    });
    return check.includes(false);
  };

  console.log(state);

  return (
    <MyStyledForm onSubmit={() => handleSubmit(event, state)}>
      {state.map((input, index) => {
        const allProps = {
          ...input,
          index,
          label,
          handleChange,
          handleFocusIn,
          handleFocusOut,
        };
        return (
          <MyStyledForm.inputSection key={index}>
            <Input {...allProps} />
          </MyStyledForm.inputSection>
        );
      })}
      {buttonText && (
        <MyStyledForm.button disabled={checkBtnDisabled()} type="submit">
          {buttonText}
        </MyStyledForm.button>
      )}
    </MyStyledForm>
  );
};

export default Form;
