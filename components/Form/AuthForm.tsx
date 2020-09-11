import React, { FC } from "react";
import Form from "../../components/Form";
import styled from "styled-components";
import Link from "next/link";

const FormContainer = styled.div`
  max-width: 432px;
  margin: 24px auto 0;
  padding: 0 24px;

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

type AuthFormProps = {
  inputs: {
    name: string;
    type?: string;
    value: any;
    focus: boolean;
    min?: number;
    max?: number;
  }[];
  buttonText: string;
  apiCall: (userInfo: {
    username: string;
    password: string;
    email: string;
  }) => void;
  type: string; //i.e in or up (Sign in or sign up)
  hrefLink: string;
};

const AuthForm: FC<AuthFormProps> = ({
  inputs,
  buttonText,
  apiCall,
  type,
  hrefLink,
}) => {
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
    console.log(data);
    // apiCall(data);
  };
  return (
    <FormContainer>
      <div>
        <Link href="/" as="/">
          <a>Logo</a>
        </Link>
      </div>
      <Styledh3>Sign in to continue</Styledh3>
      <Form
        initialValues={inputs}
        buttonText={buttonText}
        handleSubmit={handleSubmit}
        label={true}
      />
      <StyledPara>
        {type === "in" && <>Don't have an account?</>}
        {type === "up" && <>Already have an account?</>}
        <StyledSpan>
          <Link href={hrefLink} as={hrefLink}>
            {type === "in" ? <a>Sign up now</a> : <a>Sign in now</a>}
          </Link>
        </StyledSpan>
      </StyledPara>
    </FormContainer>
  );
};

export default AuthForm;
