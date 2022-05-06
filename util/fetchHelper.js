import axios from "axios";

export const fetchHelper = async (url, options = {}) => {
  return await axios
    .get(url)
    .then((response) => {
      console.log(response.data.resultData);
      return [response.data.resultData, null];
    })
    .catch((error) => {
      return [null, error];
    });
};
