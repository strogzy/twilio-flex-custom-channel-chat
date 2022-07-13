
const axios = require('axios');

const telegramApiToken =  process.env.TELEGRAM_API_TOKEN;

const sendThroughTelegram = async (body, destination) =>{


  let resp = await axios.post(`https://api.telegram.org/bot${telegramApiToken}/sendMessage`, {
    chat_id: destination,
    text: body
  });
  return resp;

  }


module.exports =  {sendThroughTelegram};