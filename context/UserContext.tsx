import React, { createContext, useState } from "react";

export const UserContext = createContext<any>({
  isUserLoggedIn: false,
});

const UserProvider = ({ children, authenticated }: any) => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(authenticated);
  return (
    <UserContext.Provider value={{ isUserLoggedIn, setUserLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
