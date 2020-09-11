import SearchIcon from "../../Icons/SearchIcon";
import { FC } from "react";

export const Icons: any = {
  SEARCH: <SearchIcon />,
};

type IconType = {
  iconName?: string;
};

const Icon: FC<IconType> = ({ iconName }) => {
  return <>{iconName && Icons[iconName]}</>;
};

export default Icon;
