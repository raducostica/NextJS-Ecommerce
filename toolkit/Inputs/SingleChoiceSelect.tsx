import styled from "styled-components";

const StyledSelectButton = styled.div`
  flex: 1;
  text-align: center;
  :first-of-type {
    margin-right: 8px;
  }

  :last-of-type {
    margin-left: 8px;
  }
`;

const StyledSelectButtonContainer = styled.div`
  display: flex;
  input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }

  label {
    display: block;
    background-color: #ddd;
    padding: 12px 20px;
    font-family: sans-serif, Arial;
    font-size: 16px;
    border: 1px solid #444;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }

  input[type="radio"]:checked + label {
    background: red;
  }
`;

const SingleChoiceSelect = ({ value, handleClick, selectedItems }: any) => {
  return (
    <StyledSelectButtonContainer>
      {value.map((inp: any, index: number) => {
        return (
          <StyledSelectButton key={index}>
            <input
              type="radio"
              id={inp.text}
              name={inp.text}
              value={inp.text}
              onClick={(event) => handleClick(event, inp.id)}
              checked={selectedItems[inp.id] ? true : false}
              onChange={() => null}
            />
            <label htmlFor={inp.text}>{inp.text}</label>
          </StyledSelectButton>
        );
      })}
    </StyledSelectButtonContainer>
  );
};

export default SingleChoiceSelect;
