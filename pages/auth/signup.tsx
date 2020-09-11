import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import AuthForm from "../../components/Form/AuthForm";

const signUpInputs = [
  {
    name: "email",
    type: "email",
    value: "",
    focus: false,
  },
  {
    name: "username",
    value: "",
    focus: false,
    min: 3,
    max: 16,
  },
  {
    name: "password",
    type: "password",
    value: "",
    focus: false,
    min: 6,
    max: 16,
  },
];

const Signup = () => {
  const { registerUser } = useContext(UserContext);
  return (
    <AuthForm
      inputs={signUpInputs}
      buttonText="SIGN IN"
      apiCall={registerUser}
      type={"up"}
      hrefLink="/auth/signin"
    />
  );
};

export default Signup;
