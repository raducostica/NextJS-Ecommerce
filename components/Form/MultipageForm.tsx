import { FC, useState, useEffect } from "react";
import Form from "./index";

type formInputs = {
  [key: number]: {
    name: string;
    type?: string | undefined;
    value: any;
    focus: boolean;
    min?: number | undefined;
    max?: number | undefined;
  }[];
};

let newformInputs: formInputs = {
  "0": [
    {
      name: "username",
      value: "",
      focus: false,
      min: 3,
    },
    {
      name: "password",
      value: "",
      focus: false,
      min: 3,
    },
  ],
  "1": [
    {
      name: "username",
      value: "",
      focus: false,
      min: 3,
    },
    {
      name: "password",
      value: "",
      focus: false,
      min: 3,
    },
    {
      name: "gender",
      value: "",
      focus: false,
      min: 3,
    },
  ],
  "2": [
    {
      name: "username",
      value: "",
      focus: false,
      min: 3,
    },
    {
      name: "password",
      value: "",
      focus: false,
      min: 3,
    },
    {
      name: "gender",
      value: "",
      focus: false,
      min: 3,
    },
    {
      name: "height",
      value: "",
      focus: false,
      min: 3,
    },
  ],
};

const MultipageForm: FC<any> = ({ formInputs }) => {
  const [formState, setFormState] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentInputs, setCurrentInputs] = useState(
    newformInputs[currentPage]
  );

  useEffect(() => {
    setCurrentInputs(newformInputs[currentPage]);
  }, [currentPage]);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    formData: any
  ) => {
    event.preventDefault();
    const formStateCopy: any = [...formState];
    formStateCopy[currentPage] = formData.reduce(
      (acc: { [key: string]: string }, curr: { [key: string]: any }) => {
        acc[curr.name] = curr.value;
        return acc;
      },
      {}
    );
    setFormState(formStateCopy);

    if (currentPage >= Object.keys(newformInputs).length - 1) {
      console.log(formState, "formState");
      return;
    }
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <Form
      initialValues={currentInputs}
      buttonText="NEXT"
      handleSubmit={handleSubmit}
    />
  );
};

export default MultipageForm;
