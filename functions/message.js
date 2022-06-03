const axios = require('axios').default;
// const fetch = require("node-fetch");
const { URLSearchParams } = require("url");
var base64 = require("base-64");

const flexFlowSid = process.env.FLEX_FLOW_SID;
const flexChatService = process.env.FLEX_CHAT_SERVICE;

// message received from customer
exports.handler = async (context, event, callback) => {
    console.log("event", event);

    const {checkChannel} = require(Runtime.getFunctions()['adapters/index'].path);
    const channelData = checkChannel(event);

    console.log("Sending new chat message");

    let client = context.getTwilioClient();
    const {createNewChannel} = require(Runtime.getFunctions()['helpers/index'].path);
    let flexChannelCreatedSid = await createNewChannel(flexFlowSid, flexChatService, channelData, client, context.DOMAIN_NAME );
    console.log(flexChannelCreatedSid);
    if (!flexChannelCreatedSid){
      console.log("Couldn't create channel");
    }

    let resp = await sendChatMessage(
      flexChatService,
      flexChannelCreatedSid,
      channelData.fromNumber,
      channelData.msg
    );
    console.log("resp:",resp);

    return callback(null, {});

};

const sendChatMessage = async(serviceSid, channelSid, chatUserName, body) =>{
  console.log("Sending new chat message");
  const params = new URLSearchParams();
  console.log(body, chatUserName);
  params.append("Body", body);
  params.append("From", chatUserName);
  
  let resp = await axios(
    {
    method:'post',
    url: `https://chat.twilio.com/v2/Services/${serviceSid}/Channels/${channelSid}/Messages`,
    data: params,
    headers:{
        "X-Twilio-Webhook-Enabled": "True",
        // 'Content-Type': 'multipart/form-data', 
        Authorization: `Basic ${base64.encode(
          `${process.env.ACCOUNT_SID}:${process.env.AUTH_TOKEN}`
          )}`,
        }
  });
  console.log("rest", resp.data, resp.config);
  return resp;
}