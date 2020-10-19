import React from "react";
import Form from "../../Form";
import styled from "styled-components";
import { useRouter } from "next/router";

const SearchContainer = styled.div`
  margin: 40px auto 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

type SearchInputProps = {
  initialWidth: number;
  initialValues: any[];
};

const SearchInput = ({ initialWidth, initialValues }: SearchInputProps) => {
  const router = useRouter();
  const handleSumbit = (event: any, inputs: any[]) => {
    event.preventDefault();
    let inputData = inputs[0].value;
    if (inputData.length >= 2) {
      router.push(`/items/${inputData}`);
    }
    return;
  };

  return (
    <SearchContainer
      style={{
        maxWidth: initialWidth,
      }}
    >
      <Form
        initialValues={initialValues}
        label={false}
        handleSubmit={handleSumbit}
        useDebounce={true}
        search={true}
      />
    </SearchContainer>
  );
};

export default SearchInput;
