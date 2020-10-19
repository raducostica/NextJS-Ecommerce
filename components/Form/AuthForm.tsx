import React, { FC, useContext, useState } from "react";
import Form from "../../components/Form";
import styled from "styled-components";
import Link from "next/link";
import { UserContext } from "../../context/UserContext";
import Modal from "../Modal/Modal";
import { useRouter } from "next/router";

const FormContainer = styled.div`
  max-width: 432px;
  margin: 24px auto 0;
  padding: 0 24px;

  height: auto;
  @media only screen and (min-width: 840px) {
    margin: 40px auto 0;
    padding: 0;
  }
`;

const Styledh3 = styled.h3`
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  padding: 16px 0;
`;

const StyledPara = styled.p`
  font-size: 12px;
  margin-top: 24px;
`;

const StyledSpan = styled.span`
  text-decoration: underline;
  margin-left: 12px;
  cursor: pointer;
  color: blue;
`;

const ErrorMessagePopup = styled.div`
  background: #fcf0f2;
  color: #d50000;
  border-radius: 3px;
  margin: 0 0 16px;
  padding: 12px;
`;

const ErrorMessage = styled.span`
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
`;

type AuthFormProps = {
  inputs: {
    name: string;
    type?: string;
    value: any;
    focus: boolean;
    min?: number;
    max?: number;
  }[];
  apiCall: (userInfo: {
    username: string;
    password: string;
    email: string;
  }) => { [key: string]: string } | void;
  hrefLink: string;
};

const redirectUrl = () => {};

const AuthForm: FC<AuthFormProps> = ({ inputs, apiCall, hrefLink }) => {
  const [modalState, setModalState] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const authUrl = hrefLink.split("/")[hrefLink.split("/").length - 1];
  const router = useRouter();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    formData: any
  ) => {
    event.preventDefault();
    const data = formData.reduce((acc: any, curr: any) => {
      let currvalue = curr.value;
      let currName = curr.name;
      acc[currName] = currvalue;
      return acc;
    }, {});
    const response = await apiCall(data);
    if (response) {
      setError(response.msg);
      return;
    }

    if (authUrl === "signin") {
      handleOnOpenModal();
      return;
    }
  };

  const handleOnOpenModal = () => {
    setModalState(true);
  };

  const handleOnCloseModal = () => {
    setModalState(false);
  };

  console.log(authUrl);

  return (
    <>
      <FormContainer>
        <div>
          <Link href="/" as="/">
            <a>Logo</a>
          </Link>
        </div>
        <Styledh3>
          Sign {authUrl === "signup" ? "in" : "up"} to continue
        </Styledh3>
        {error && (
          <ErrorMessagePopup>
            <ErrorMessage>{error}</ErrorMessage>
          </ErrorMessagePopup>
        )}
        <Form
          initialValues={inputs}
          buttonText={authUrl === "signup" ? "SIGN IN" : "SIGN UP"}
          handleSubmit={handleSubmit}
          label={true}
        />
        <StyledPara>
          {authUrl === "signup" && <>Don't have an account?</>}
          {authUrl === "signin" && <>Already have an account?</>}
          <StyledSpan>
            <Link href={hrefLink} as={hrefLink}>
              {authUrl === "signup" ? <a>Sign up now</a> : <a>Sign in now</a>}
            </Link>
          </StyledSpan>
        </StyledPara>
      </FormContainer>
      <Modal
        selector={"#modal"}
        modalState={modalState}
        handleOnCloseModal={handleOnCloseModal}
      >
        <div>Account has been created successfully</div>
        <div>
          Please{" "}
          <span>
            <Link href="/auth/signin" as="/auth/signin">
              <a>Sign In</a>
            </Link>
          </span>{" "}
          to Continue
        </div>
      </Modal>
    </>
  );
};

export default AuthForm;
