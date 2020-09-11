import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import AuthForm from "../../components/Form/AuthForm";

const signInInputs = [
  {
    name: "username",
    value: "",
    focus: false,
    min: 3,
    error: true,
    renderType: "TextInput",
  },
  {
    name: "password",
    type: "password",
    value: "",
    focus: false,
    min: 6,
    error: true,
    renderType: "TextInput",
  },
];

const Signin = () => {
  const { loginUser } = useContext(UserContext);
  return (
    <AuthForm
      inputs={signInInputs}
      buttonText="SIGN IN"
      apiCall={loginUser}
      type={"in"}
      hrefLink="/auth/signup"
    />
  );
};

export default Signin;
