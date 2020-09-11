import DefaultLayout from "../layouts/DefaultLayout";
import styled, { keyframes } from "styled-components";
import Input from "../toolkit/Inputs/Input";
import useWindowDimensions from "../utils/useWindowDimension";
import { useEffect, useState } from "react";
import Form from "../components/Form";
import SelectInput from "../toolkit/Inputs/SelectInput";

const Slide = keyframes`
  0% { margin-top: -300px;}
  5% { margin-top: -200px;}
  33% { margin-top: -200px;}
  38% { margin-top: -100px;}
  66% { margin-top: -100px;}
  72% { margin-top: -0;}
  100% { margin-top: 0;}
`;

const Slider = styled.div`
  overflow: hidden;
  height: 80px;
  padding: 0 10px;

  @media only screen and (min-width: 415px) {
    height: 50px;
  }

  @media only screen and (min-width: 800px) {
    height: 50px;
  }
`;

const Text = styled.h3`
  font-size: 28px;
  line-height: 36px;
  color: #fff;
  margin-bottom: 35px;
  padding: 0 20px;
  text-align: center;
  :first-of-type {
    animation: ${Slide} 10s linear infinite;
  }

  @media only screen and (min-width: 330px) {
    margin-bottom: 64px;
  }

  @media only screen and (min-width: 800px) {
    font-size: 44px;
    margin-bottom: 64px;
  }
`;

const StyledSpan = styled.span`
  text-decoration: underline;
`;

const Header = styled.div`
  margin-top: 60px;

  @media only screen and (min-width: 800px) {
    margin-top: 140px;
  }
`;

// SEARCH INPUT BOX
const SearchContainer = styled.div`
  margin: 40px auto 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const headline = [
  {
    textBefore: "Find your next",
    keyWord: "Smartphone",
    link: "",
  },
  {
    textBefore: "Put your",
    keyWord: "Fitness",
    textAfter: "first",
    link: "",
  },
  {
    textBefore: "New",
    keyWord: "Ring.",
    textAfter: "Happy Wife",
    link: "",
  },
];

export default function Home() {
  const { width, height } = useWindowDimensions();
  const [initialWidth, setInitialWidth] = useState(width);

  useEffect(() => {
    setInitialWidth(Math.max((width / 4) * 3.5));
  }, [width]);

  return (
    <DefaultLayout>
      <Header>
        <Slider>
          {headline.map((el, index) => {
            return (
              <Text key={index}>
                {el.textBefore} <StyledSpan>{el.keyWord}</StyledSpan>{" "}
                {el.textAfter}
              </Text>
            );
          })}
        </Slider>
        <SearchContainer
          style={{
            width: initialWidth,
            maxWidth: "870px",
          }}
        >
          <Form
            initialValues={[
              {
                value: "",
                name: "Search for anything",
                iconName: "SEARCH",
                renderType: "TextInput",
              },
            ]}
            label={false}
            handleSubmit={() => {}}
          />
        </SearchContainer>
      </Header>
      <SelectInput />
    </DefaultLayout>
  );
}
