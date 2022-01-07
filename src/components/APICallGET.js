import {API_END_POINT} from './constant'

 const APICallGET =(path,data) => {
  let url = API_END_POINT + "" + path;
  let inputData = {};

    inputData = {
      method: "GET",
      headers: data,
    };

    return new Promise((resolve)=>{
      resolve(fetch(url, inputData));
    })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export default APICallGET;
