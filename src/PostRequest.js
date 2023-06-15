const SendPostRequest = async (url, data) => {
    console.log(data)
  let Json = {};
  let message = "a";
  
  await fetch(url, {
    method: "POST",
   
    body: data,
  })
    .then((res) => res.json())
    .then((json) => {
      Json = json;
    })
    .catch((err) => {
      message = err.message;
      console.log(err)
    });



  return { message, Json };
};

export default SendPostRequest;
