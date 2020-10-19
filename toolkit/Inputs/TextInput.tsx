import { FC, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import debounce from "lodash.debounce";

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
  const {
    inputState,
    setInputState,
    isSubmitBtnDisabled,
    inputIndex,
    useDebounce,
    setSearchQuery,
  } = props;

  const isFirstRun = useRef<boolean>(true);

  const getMatchingSearch = useCallback(debounce(setSearchQuery, 700), [
    inputState[inputIndex].value,
  ]);

  useEffect(() => {
    let check = props.minOrNoofChoices
      ? props.value.length >= props.minOrNoofChoices
      : props.value.length > 1;

    if (check) {
      isSubmitBtnDisabled(true, inputIndex);
    } else {
      isSubmitBtnDisabled(false, inputIndex);
    }
  }, [props.value]);

  useEffect(() => {
    // skip first run
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (useDebounce) {
      getMatchingSearch(inputIndex);
    }
  }, [props.value]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let newInputs = [...inputState];
    newInputs[index] = {
      ...newInputs[index],
      value: event.target.value,
    };
    setInputState(newInputs);
  };

  const handleFocusIn = (index: number) => {
    let newInputs = [...inputState];
    if (typeof newInputs[index].focus !== "undefined") {
      newInputs[index] = {
        ...newInputs[index],
        focus: false,
      };
      setInputState(newInputs);
    }
  };

  const handleFocusOut = (index: number) => {
    let newInputs = [...inputState];
    if (typeof newInputs[index].focus !== "undefined") {
      newInputs[index] = {
        ...newInputs[index],
        focus: true,
      };
      setInputState(newInputs);
    }
  };

  return (
    <>
      <StyledInput
        onChange={(e) => handleChange(e, inputIndex)}
        onFocus={() => handleFocusIn(inputIndex)}
        onBlur={() => handleFocusOut(inputIndex)}
        {...props}
      />
      <StyledFormError>
        {props.focus && props.error && (
          <>
            {props.minOrNoofChoices ? (
              <>
                {props.value.length < props.minOrNoofChoices &&
                  props.value.length > 0 && (
                    <span>
                      {props.name.toUpperCase()} must be atleast{" "}
                      {props.minOrNoofChoices} characters long
                    </span>
                  )}
                {props.value.length < 1 && <span>Required</span>}
              </>
            ) : (
              props.value.length < 1 && <span>Required</span>
            )}
          </>
        )}
      </StyledFormError>
    </>
  );
};

export default TextInput;
