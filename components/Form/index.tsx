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
  const [inputState, setInputState] = useState(initialValues);
  const [buttonDisabled, setButtonDisabled] = useState<boolean[]>(
    initialValues.map((val) => {
      return false;
    })
  );

  useEffect(() => {
    setInputState(initialValues);
  }, [initialValues]);

  const isSubmitBtnDisabled = (inputFilled: boolean, index: number) => {
    let validInputs = [...buttonDisabled];
    validInputs[index] = inputFilled;
    setButtonDisabled(validInputs);
  };

  return (
    <MyStyledForm onSubmit={() => handleSubmit(event, inputState)}>
      {inputState.map((input, index) => {
        const inputProps = {
          ...input,
          index,
          label,
          inputState,
          setInputState,
          buttonDisabled,
          isSubmitBtnDisabled,
        };
        return (
          <MyStyledForm.inputSection key={index}>
            <Input {...inputProps} />
          </MyStyledForm.inputSection>
        );
      })}
      {buttonText && (
        <MyStyledForm.button
          disabled={
            buttonDisabled.length === inputState.length
              ? buttonDisabled.includes(false)
              : false
          }
          type="submit"
        >
          {buttonText}
        </MyStyledForm.button>
      )}
    </MyStyledForm>
  );
};

export default Form;
