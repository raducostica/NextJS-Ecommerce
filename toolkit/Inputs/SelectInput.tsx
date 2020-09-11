import { useState, ChangeEvent } from "react";
import styled from "styled-components";

const StyledRadioOptionContainer = styled.div`
  background: blue;
  border-radius: 4px;
  input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }

  label {
    display: block;
    background-color: #ddd;
    padding: 10px 20px;
    font-family: sans-serif, Arial;
    font-size: 16px;
    border: 2px solid #444;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const SelectInput = () => {
  const [openSelect, setOpenSelect] = useState(false);
  const [textDisplayed, setTextDisplayed] = useState("Please Select an option");

  const handleChange = (index: number) => {
    console.log(inputs[index]);
    setTextDisplayed(inputs[index]);
  };

  let inputs = ["go", "no", "hello", "bye"];
  return (
    <>
      <div>{textDisplayed}</div>
      <StyledRadioOptionContainer>
        {inputs.map((inp, index) => {
          return (
            <>
              <input
                type="radio"
                id={inp}
                name={inp}
                value={inp}
                onChange={() => handleChange(index)}
              />
              <label htmlFor={inp}>{inp}</label>
            </>
          );
        })}
      </StyledRadioOptionContainer>
    </>
  );
};

export default SelectInput;
