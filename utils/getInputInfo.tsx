import axios from "axios";
export const getInputInfo = async (data: any) => {
  let response = await axios.post("http://localhost:3000/api/inputs", data);
  return response.data.inputs;
};
