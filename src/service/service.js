import axios from "axios";

const axiosObj = axios.create({
  baseURL: "https://s3-ap-southeast-1.amazonaws.com",
});

export const getUserDetails = () => {
  let path = `/he-public-data/users49b8675.json`;
  return axiosObj.get(path).then((response) => {
    return response;
  });
};
