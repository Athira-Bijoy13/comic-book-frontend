const SendGetRequest = async (url) => {
  
    let Json = {};
    let message = "a";
    
    await fetch(url, {
      method: "GET",
      
    })
      .then((res) => res.json())
      .then((json) => {
        Json = json;
      })
      .catch((err) => {
        message = err.message;
      });
  
  
  
    return { message, Json };
  };
  
  export default SendGetRequest;