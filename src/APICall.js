let apiEndPoint = "https://api-us.juegogames.com/NOMOS-V3/";

export const APICall = async (path, methodName, data, headers = {}) => {
  let url = apiEndPoint + "" + path;
  let inputData = {};

  if (methodName === "GET") {
    inputData = {
      method: "GET",
      headers: data,
    };
  }

  if (methodName === "POST") {
    inputData = {
      method: methodName,
      headers: headers,
      body: data,
    };
  }

  return await fetch(url, inputData)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
export default APICall;
