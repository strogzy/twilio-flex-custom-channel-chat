


// example message from Viber
// const sample_viber = { 
//   request: { 
//     headers: { 
//       'x-request-id': 'bd210d7d-15e8-443b-822d-3cd23cdda348', 
//       'content-length': '131', 
//       't-request-id': 'RQ35a8667607eda12bd0dc489d6fc64630', 
//       'content-type': 'application/json;charset=UTF-8' 
//     }, 
//     cookies: {} 
//   }, 
//   message_token: '123124121515', 
//   phone_number: '+31111111', 
//   time: 16510551156, 
//   service_id: 11111111111111, 
//   message: { text: 'Ola' } 
// }; 

// example messag from Telerivet
// const sample_telerivet = {
//   id: "uniqueMessageID",
//   event: "incoming_message",
//   content: "hello from TR",
//   message_type: "sms",
//   from_number: '+123456789',
//   from_number_e164: '+123456789',
//   to_number: '+123455667789',
//   phone_id: '123545',
//   contact_id: '123455',
//   project_id: '12345',
//   service_id: '1234',
//   message_service_id: '1234',
//   secret: '12345'
// }
const trSecret = process.env.TELERIVET_SECRET;

const checkChannel = (msg) =>{
  const msgData = {
    fromNumber: '',
    msg: '',
    channel: '',
  }

  if (msg.secret == trSecret && msg.event == "incoming_message" && msg.message_type == "sms"){
    // based on the params likely to be a msg from Telerivet
    msgData.fromNumber = msg.from_number;
    msgData.msg = msg.content;
    msgData.channel = 'telerivet';
  }
  else if (msg.phone_number && msg.message.text){
    // likely to be viber
    msgData.fromNumber = msg.phone_number;
    msgData.msg = msg.message.text;
    msgData.channel = 'viber';
  }
  else if (msg.message.chat.id){
    // telegram
    msgData.fromNumber = msg.message.chat.id;
    msgData.msg = msg.message.text;
    msgData.channel = 'telegram';

  }
  return msgData;

}


module.exports =  {checkChannel};