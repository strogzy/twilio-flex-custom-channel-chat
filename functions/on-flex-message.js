const axios = require('axios');

const viber_service_id =  process.env.VIBER_SERVICE_ID;
const viber_url = process.env.VIBER_URL;

exports.handler = async (context, event, callback) =>{
  console.log('Twilio new message webhook fired', event);  
  const message = event.Body;
  let client = context.getTwilioClient();
  
  if (event.Source === 'SDK' ) {
    console.log('chat message from Flex:', event.Body);
    
    let members = await client.chat.services(event.InstanceSid)
    .channels(event.ChannelSid)
    .members
    .list({limit:10});
   
    console.log("checking nmenbers", members);
    for (m of members) {
      console.log("check", m);
      if (m.identity.startsWith('+')){
          // If it starts with + we treat it as a phone number and will try to send a message through telerivet
        // console.log(m.sid, m.identity);
        let resp = await sendThroughViber(message, m.identity);
        
        console.log("viber response",resp);
        
      }
    }
    // let resp = await sendThroughViber(message, m.ide ); //"m.identity"
    //console.log('final', resp);
    //return callback(null, resp)
  }
  return callback(null, {msg:"ok"});
}

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

  };
