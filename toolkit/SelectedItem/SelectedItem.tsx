import styled from "styled-components";
import Icon from "../Icon/Icon";
import { FC } from "react";

const StyledSelectedItem = styled.div<{ border: boolean }>`
  border: ${({ border }) => (border ? "1px solid #333" : "none")};
  padding: 8px;
  margin: 4px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSelectedItemText = styled.div`
  flex: 1;
  padding: 0 4px;
  font-size: 14px;
`;

const StyledSelectedItemIcon = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type SelectedItemProps = {
  handleClick?: (e: React.SyntheticEvent<EventTarget>, inputId: number) => void;
  inputId?: number;
  iconName: string;
  border: boolean;
};

const SelectedItem: FC<SelectedItemProps> = ({
  handleClick,
  inputId,
  iconName,
  border,
  ...props
}) => {
  return (
    <StyledSelectedItem border={border}>
      <StyledSelectedItemText>{props.children}</StyledSelectedItemText>
      <StyledSelectedItemIcon
        onClick={
          inputId !== undefined && typeof handleClick === "function"
            ? (e) => handleClick(e, inputId)
            : undefined
        }
      >
        <Icon iconName={iconName} />
      </StyledSelectedItemIcon>
    </StyledSelectedItem>
  );
};

export default SelectedItem;
