
const axios = require('axios');

const telegramApiToken =  process.env.TELEGRAM_API_TOKEN;

const sendThroughTelegram = async (body, destination) =>{


  let resp = await axios.post(`https://api.telegram.org/bot${telegramApiToken}/sendMessage`, {
    chat_id: destination,
    text: body
  });
  return resp;

  }


const receiveMessage = async(msg) =>{
  if (msg.message.chat.id){
    // telegram
    msgData.fromNumber = msg.message.chat.id;
    msgData.msg = msg.message.text;
    msgData.channel = 'telegram';
    return msgData; 
  }
  return null;
}

module.exports =  {sendThroughTelegram, receiveMessage};