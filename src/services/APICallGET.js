import {API_END_POINT} from '../global/constant'

 const APICallGET =(path,data) => {
  let url = API_END_POINT + "" + path;
  let inputData = {};

    inputData = {
      method: "GET",
      headers: data,
    };

    return new Promise((resolve, reject) => {
      fetch(url, inputData)
      .then((response)=>{
        return response.json()
      })
      .then((data) => {
        if(data.responseCode===200){
        return resolve(data)
       }
        reject(alert(data.responseMessage))
      }).catch(err => {
        reject(err)
      })

    })
};

export default APICallGET;
