import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import AuthForm from "../../components/Form/AuthForm";
import { getInputInfo } from "../../utils/getInputInfo";

const Signup = ({ inputs }: any) => {
  const { registerUser } = useContext(UserContext);
  return (
    <AuthForm
      inputs={inputs}
      buttonText="SIGN IN"
      apiCall={registerUser}
      type={"up"}
      hrefLink="/auth/signin"
    />
  );
};

export const getStaticProps = async () => {
  let inputData = {
    inputTypes: ["TextInput", "TextInput", "SelectInput"],
    minOrNoofChoices: [0, 3, 4],
    focus: false,
    values: [
      "",
      "",
      [
        { id: 0, text: "go" },
        { id: 1, text: "no" },
        { id: 2, text: "hello and goodbye my friend" },
        { id: 3, text: "bye" },
        { id: 4, text: "test" },
        { id: 5, text: "poop" },
        { id: 6, text: "cool" },
      ],
    ],
    inputNames: ["email", "username", "choices"],
    error: true,
    type: ["email", "text", "radio"],
  };
  const returnData = await getInputInfo(inputData);
  return {
    props: {
      inputs: returnData,
    },
  };
};

export default Signup;
