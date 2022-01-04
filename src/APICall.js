let apiEndPoint ='https://api-us.juegogames.com/NOMOS-V3/';

export const APICall =async (path,methodName,data)=>{
    let url=apiEndPoint+''+path;
    console.log(url)
    let inputData={};
    if(methodName==='GET'){
      inputData=  {
            method: 'GET',
            headers: data                   
        }
    }

    if(methodName==='POST'){
       inputData={
        method: methodName,
        headers: { "Content-Type": "application/json" },
        body:data
      }
    }

    return await fetch(url, inputData)
    .then((response) =>  response.json())
    .then((data) => {
        return data;       
    }).catch((err)=>{
        return err;
    })  
  
}
export default APICall;

