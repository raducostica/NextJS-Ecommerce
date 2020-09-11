import React, { createContext, useReducer, Reducer } from "react";
import axios from "axios";

type StateType = {
  userLoggedIn: boolean;
  token: string;
  user: {
    id: number | null;
    username: string;
  };
};

type ActionType = {
  type: string;
  payload: any;
};

const initialState: StateType = {
  userLoggedIn: false,
  token: "",
  user: {
    id: null,
    username: "",
  },
};

export const UserContext = createContext<StateType | any>(initialState);

const userReducer: Reducer<StateType, ActionType> = (state, action): any => {
  switch (action.type) {
    case "LOGIN":
      return state;
    case "REGISTER":
      return state;
  }
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const UserProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const registerUser = async (userInfo: {
    username: string;
    password: string;
    email: string;
  }) => {
    try {
      const res = await axios.post("/auth/signup", userInfo, config);

      dispatch({ type: "REGISTER", payload: res });
    } catch (error) {
      console.error(error);
    }
  };

  const loginUser = async (userInfo: {
    username: string;
    password: string;
    email: string;
  }) => {
    try {
      const res = await axios.post("/auth/signin", userInfo, config);

      dispatch({ type: "LOGIN", payload: res });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <UserContext.Provider value={{ state, registerUser, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
