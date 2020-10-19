import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import AuthForm from "../../components/Form/AuthForm";
import { getInputInfo } from "../../utils/getInputInfo";

const Signup = ({ inputs }: any) => {
  const { registerUser } = useContext(UserContext);
  return (
    <AuthForm inputs={inputs} apiCall={registerUser} hrefLink="/auth/signin" />
  );
};

export const getStaticProps = async () => {
  let inputData = {
    inputTypes: ["TextInput", "TextInput", "TextInput"],
    minOrNoofChoices: [0, 3, 4],
    focus: false,
    values: ["", "", ""],
    inputNames: ["email", "username", "password"],
    error: true,
    type: ["email", "text", "password"],
  };
  const returnData = getInputInfo(inputData);
  return {
    props: {
      inputs: returnData,
    },
  };
};

export default Signup;
