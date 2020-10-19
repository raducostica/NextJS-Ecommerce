import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import MyStyledForm from "./FormStyles";
import Input from "../../toolkit/Inputs/Input";
import Modal from "../Modal/Modal";
import axios from "axios";

type FormProps = {
  initialValues: any[];
  label: boolean;
  buttonText?: string;
  handleSubmit: (...args: any) => void;
  useDebounce?: boolean;
  search?: boolean;
};

export type ModalRenderProps = {
  handleModalState: (modal: boolean) => void;
};

const SingleFormSuggestion = styled.div`
  padding: 8px 4px;
  border-bottom: 1px solid #999;
  cursor: pointer;
`;

const Form: FC<FormProps> = ({
  initialValues,
  buttonText,
  handleSubmit,
  label,
  useDebounce,
  search,
}) => {
  const [inputState, setInputState] = useState(initialValues);
  const [matchingSearch, setMatchingSearch] = useState<any[]>([]);
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

  const setSearchQuery = async (index: number) => {
    let value: string = inputState[index].value;
    if (value.length >= 2) {
      const response = await axios.get("/api/search/items", {
        params: {
          value,
        },
      });
      const { products } = response.data;
      setMatchingSearch(products);
    } else {
      setMatchingSearch([]);
    }
  };

  const handleSuggestionClick = (
    event: any,
    inputIndex: number,
    searchIndex: number,
    fn: any
  ) => {
    let newInputs = [...inputState];
    newInputs[inputIndex] = {
      ...newInputs[inputIndex],
      value: matchingSearch[searchIndex].name,
    };
    fn(false);
    setInputState(newInputs);
    handleSubmit(event, inputState);
  };

  const resetFormState = () => {
    setInputState(initialValues);
  };

  return (
    <MyStyledForm
      onSubmit={() => {
        handleSubmit(event, inputState);
        resetFormState();
      }}
    >
      {inputState.map((input, inputIndex) => {
        const inputProps = {
          ...input,
          inputIndex,
          label,
          inputState,
          setInputState,
          buttonDisabled,
          isSubmitBtnDisabled,
          handleSubmit,
          useDebounce: useDebounce ? true : false,
          setSearchQuery,
          search,
          resetFormState,
        };
        return (
          <MyStyledForm.inputSection key={inputIndex}>
            <Input {...inputProps} />
            {/* {search && (
              <Modal showModal={matchingSearch.length >= 2}>
                {({ handleModalState }: ModalRenderProps) => {
                  return (
                    <>
                      {matchingSearch.map((search, searchIndex) => {
                        return (
                          <SingleFormSuggestion
                            onClick={(e) =>
                              handleSuggestionClick(
                                e,
                                inputIndex,
                                searchIndex,
                                handleModalState
                              )
                            }
                            key={searchIndex}
                          >
                            {search.name}
                          </SingleFormSuggestion>
                        );
                      })}
                    </>
                  );
                }}
              </Modal>
            )} */}
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
