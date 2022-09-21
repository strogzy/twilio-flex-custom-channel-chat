
const axios = require('axios');

const viber_service_id =  process.env.VIBER_SERVICE_ID;
const viber_url = process.env.VIBER_SERVICE_URL;

const sendThroughViber = async (body, destination) =>{
  let viberDestination = destination.replace('+','');
  console.log("send a message ", viberDestination);
  let msg_req = {
    "service_id":parseInt(viber_service_id), 
    "dest":`${viberDestination}`, 
    "tag":"SaleCamp 12", 
    "seq":123456, 
    "label":"promotion", 
    "ttl":60, 
    "type":206, 
    "message": { 
      "#txt":`${body}`, 
      "#tracking_data":"tracking_id:100035" 
    }
  };

  let resp = await axios.post(viber_url, msg_req);
  return resp;

  }

  const receiveMessage = async (msg) => {
    if (msg.channel == 'viber') {
      // telerivet
      msgData.fromNumber = msg.phone_number;
      msgData.msg = msg.message.text;
      msgData.channel = 'viber';
      return msgData;
    }
    return null;
  }


module.exports =  {sendThroughViber, receiveMessage};