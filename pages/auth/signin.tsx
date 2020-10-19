import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import AuthForm from "../../components/Form/AuthForm";
import { getInputInfo } from "../../utils/getInputInfo";

const Signin = ({ inputs }: any) => {
  const { loginUser } = useContext(UserContext);
  return (
    <AuthForm inputs={inputs} apiCall={loginUser} hrefLink="/auth/signup" />
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
  const inputInfo = getInputInfo(inputData);
  return {
    props: {
      inputs: inputInfo,
    },
  };
};

export default Signin;
