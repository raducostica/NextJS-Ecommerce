import SearchIcon from "../../Icons/SearchIcon";
import { FC } from "react";
import ArrowDown from "../../Icons/ArrowDown";
import ArrowUp from "../../Icons/ArrowUp";
import Close from "../../Icons/Close";

export const Icons: any = {
  SEARCH: <SearchIcon />,
  CLOSE: <Close />,
  ARROWUP: <ArrowUp />,
  ARROWDOWN: <ArrowDown />,
};

type IconType = {
  iconName?: string;
};

const Icon: FC<IconType> = ({ iconName }) => {
  return <>{iconName && Icons[iconName]}</>;
};

export default Icon;
