import { useContext } from "react";
import { NextPageContext } from "next";
import { UserContext } from "../../context/UserContext";
import AuthForm from "../../components/Form/AuthForm";
import axios from "axios";
import { getInputInfo } from "../../utils/getInputInfo";

const Signin = ({ inputs }: any) => {
  const { loginUser } = useContext(UserContext);
  console.log(inputs, "inputs");
  return (
    <AuthForm
      inputs={inputs}
      buttonText="SIGN IN"
      apiCall={loginUser}
      type={"in"}
      hrefLink="/auth/signup"
    />
  );
};

export const getStaticProps = async () => {
  let inputData = {
    inputTypes: ["TextInput", "TextInput"],
    minOrNoofChoices: [3, 5],
    focus: false,
    values: ["", ""],
    inputNames: ["username", "password"],
    error: true,
    type: ["text", "password"],
  };
  const returnData = await getInputInfo(inputData);
  return {
    props: {
      inputs: returnData,
    },
  };
};

export default Signin;
