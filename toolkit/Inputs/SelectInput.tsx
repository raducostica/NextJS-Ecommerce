import { useState, Fragment, useEffect } from "react";
import styled from "styled-components";
import SelectedItem from "../SelectedItem/SelectedItem";

const StyledRadioOptionContainer = styled.div`
  background: blue;
  border-radius: 4px;
  transition: opacity 0.3s ease-in;
  opacity: 0;
  height: 0;
  overflow: hidden;
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
    border: 1px solid #444;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }

  input[type="radio"]:checked + label {
    background: red;
  }

  &.active {
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 0;
    width: 100%;
    opacity: 1;
    height: auto;
  }
`;

const SelectInputHolder = styled.div`
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 8px;
  min-height: 44px;
  flex-wrap: wrap;
  width: 100%;
`;

const SelectInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`;

const SelectInput = (props: any) => {
  const { isSubmitBtnDisabled, index, value, minOrNoofChoices } = props;
  const [openSelectMenu, setOpenSelectMenu] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{ [key: number]: string }>(
    {}
  );

  useEffect(() => {
    let currentlySelectedCount = Object.keys(selectedItems).length;
    if (
      currentlySelectedCount < minOrNoofChoices &&
      currentlySelectedCount > 0
    ) {
      setOpenSelectMenu(true);
    }
  }, [selectedItems]);

  const handleChange = (
    event: React.SyntheticEvent<EventTarget>,
    inputId: number
  ) => {
    event.stopPropagation();
    let prevSelected = { ...selectedItems };
    if (prevSelected[inputId]) {
      delete prevSelected[inputId];
    } else {
      prevSelected[inputId] =
        value[value.findIndex((input: any) => input.id === inputId)].text;
    }
    setSelectedItems(prevSelected);
    if (Object.keys(prevSelected).length === minOrNoofChoices) {
      isSubmitBtnDisabled(true, index);
      setOpenSelectMenu(false);
    } else {
      isSubmitBtnDisabled(false, index);
    }
  };

  const handleClick = () => {
    setOpenSelectMenu((prevOpenSelect) => !prevOpenSelect);
  };

  return (
    <SelectInputContainer>
      <SelectInputHolder onClick={handleClick}>
        {Object.keys(selectedItems).length === 0 ? (
          <SelectedItem
            border={false}
            iconName={!openSelectMenu ? "ARROWDOWN" : "ARROWUP"}
          >
            {`Please select ${minOrNoofChoices} from the following`}
          </SelectedItem>
        ) : (
          Object.keys(selectedItems).map((key: string, index: number) => {
            let inputId =
              value[value.findIndex((input: any) => input.id === parseInt(key))]
                .id;
            return (
              <SelectedItem
                border={true}
                handleClick={handleChange}
                key={index}
                inputId={inputId}
                iconName={"CLOSE"}
              >
                {selectedItems[parseInt(key)]}
              </SelectedItem>
            );
          })
        )}
      </SelectInputHolder>
      <StyledRadioOptionContainer className={openSelectMenu ? "active" : ""}>
        {value.map((inp: any, index: number) => {
          return (
            <Fragment key={index}>
              <input
                type="radio"
                id={inp.text}
                name={inp.text}
                value={inp.text}
                disabled={
                  !selectedItems[inp.id] &&
                  Object.keys(selectedItems).length === minOrNoofChoices
                }
                onChange={() => null}
                onClick={(event) => handleChange(event, inp.id)}
                checked={selectedItems[inp.id] ? true : false}
              />
              <label htmlFor={inp.text}>{inp.text}</label>
            </Fragment>
          );
        })}
      </StyledRadioOptionContainer>
    </SelectInputContainer>
  );
};

export default SelectInput;
