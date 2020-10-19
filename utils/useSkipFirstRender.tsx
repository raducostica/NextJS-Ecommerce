import { useRef, useEffect } from "react";

export const useSkipFirstRender = (dependencyArray: any[], fn: () => void) => {
  const isFirstRun = useRef<boolean>(true);

  useEffect(() => {
    console.log("running");
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    fn();
  }, dependencyArray);
};
