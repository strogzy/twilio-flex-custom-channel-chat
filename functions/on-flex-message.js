const axios = require('axios');

const viber_service_id =  process.env.VIBER_SERVICE_ID;
const viber_url = process.env.VIBER_URL;

exports.handler = async (context, event, callback) =>{
  console.log('Twilio new message webhook fired', event);  
  const message = event.Body;
  const channel = event.type;
  let client = context.getTwilioClient();
  const {sendThroughViber} = require(Runtime.getFunctions()['adapters/viber'].path); 
  const {sendThroughTelerivet} = require(Runtime.getFunctions()['adapters/telerivet'].path); 

  if (event.Source === 'SDK' ) {
    console.log('chat message from Flex:', event.Body);
    
    let members = await client.chat.services(event.InstanceSid)
    .channels(event.ChannelSid)
    .members
    .list({limit:10});
   
    console.log("checking members", members);
    for (m of members) {
      console.log("check", m);
      if (m.identity.startsWith('+')){
        // If it starts with + we treat it as a phone number and will try to send a message through an existing custom channel
        // TODO: this logic needs improvement
        // console.log(m.sid, m.identity);
        let resp;
        if (channel == 'telerivet'){
          resp = await sendThroughTelerivet(message, m.identity);
        }
        else if (channel == 'viber' ){
          resp = await sendThroughViber(message, m.identity);
        }
        
        console.log("sending response", resp);
        
      }
    }
  }
  return callback(null, {msg:"ok"});
}

