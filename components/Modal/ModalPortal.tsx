import { FC, useState, useEffect } from "react";
import ReactDOM from "react-dom";

type ModalPortalProps = {
  selector: any;
  children: any;
};

const ModalPortal: FC<ModalPortalProps> = ({ selector, children }) => {
  const [selectorState, setSelectorState] = useState(undefined);

  useEffect(() => {
    if (selector !== undefined && typeof window !== undefined) {
      setSelectorState(document.querySelector(selector));
    }
  }, []);

  if (selectorState === undefined) {
    return null;
  }

  return ReactDOM.createPortal(children, selectorState!);
};

export default ModalPortal;
