import { API_END_POINT } from "./constant";

 const APICallPOST =  (path, data, headers={} ) => {
  let url = API_END_POINT + "" + path;
  let inputData = {};

    inputData = {
      'Content-Type': 'application/json',
      'method': 'POST',
      'headers': headers,
      'body': data,
    };

  return new Promise((resolve)=>{
    resolve(fetch(url, inputData));
  })
  .then((response)=>{
    return response.json();
  }).then((data)=>{
    return data;
  }).catch((err)=>{
    return err;
  })

};


export default APICallPOST;