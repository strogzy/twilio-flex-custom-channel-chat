
const axios = require('axios').default;
var base64 = require("base-64");

const project_id = process.env.TELERIVET_PROJECT_ID;
const telerivet_url = `${process.env.TELERIVET_SERVICE_URL}${project_id}/messages/send`;
const trAPIkey = process.env.TELERIVET_API_KEY;


const sendThroughTelerivet = async (body, destination) =>{
  
  console.log("send a message ", destination, telerivet_url);

  let msg_req = {
    "to_number":`${destination}`, 
    "content":`${body}`, 
    }
 
  let resp = await axios(
    {
    method:'post',
    url: telerivet_url,
    data: msg_req,
    headers:{
        Authorization: `Basic ${base64.encode(`${trAPIkey}:`)}`,
        "Content-Type": 'application/json'
        }
  });
  console.log("rest", resp.data, resp.config);
  return resp;

  }


module.exports =  {sendThroughTelerivet};