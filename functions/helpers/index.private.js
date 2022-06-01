

async function createNewChannel(flexFlowSid, flexChatService, chatUserName, client, domainName) {
  console.log("creating new channel");
  let newChannelSid = '';
  
  let newChannelCreated = await client.flexApi.channel
  .create({
    flexFlowSid: flexFlowSid,
    identity: chatUserName,
    longLived: true,
    chatUserFriendlyName: chatUserName,
    chatFriendlyName: "Flex Custom Chat",
    target: chatUserName,
  });
  console.log(`Retrieved channel ${newChannelCreated.sid}`);
  console.log('Channel details', newChannelCreated );
  
  // let webhooks = await client.chat.services(flexChatService).channels(newChannelCreated.sid).webhooks.list();
  // webhooks.forEach(w => {
  //   console.log('w',w);
  // });
  let webhooks = await getChannelWebhooks(flexChatService, newChannelCreated.sid, client);
  console.log("webhooks", webhooks.length);
  let assignWebhooks = true;
  if (webhooks.length){
    console.log('running checks');
    for (let i = 0; i<webhooks.length; i++){
      if (webhooks[i].configuration && webhooks[i].configuration.filters){
        console.log(webhooks[i])
        let filters = webhooks[i].configuration.filters;
        if (filters.includes('onMessageSent')){
          assignWebhooks = false;
          newChannelSid = newChannelCreated.sid;
          break;
        }
      }
    }
  }

  console.log(newChannelCreated, assignWebhooks);
  if (newChannelCreated && assignWebhooks){
    console.log("setting webhooks");
    let webhook1 = await client.chat.services(flexChatService).channels(newChannelCreated.sid).webhooks.create({
      type: "webhook",
      "configuration.method": "POST",
      "configuration.url": `https://${domainName}/on-flex-message?channel=${newChannelCreated.sid}`,
      "configuration.filters": ["onMessageSent"],
    });
    let webhook2 = await client.chat.services(flexChatService).channels(newChannelCreated.sid).webhooks.create({
      type: "webhook",
      "configuration.method": "POST",
      "configuration.url": `https://${domainName}/on-channel-update`,
      "configuration.filters": ["onChannelUpdated"],
    });
    if (webhook1 && webhook2){
      newChannelSid = newChannelCreated.sid;
      console.log("webhooks set", webhook1, webhook2, newChannelSid);

    }
  }
  else{
    console.log("not assigning webhooks", newChannelCreated, assignWebhooks );
  }
  return newChannelSid; 
}

async function getChannelWebhooks(flexChatService, channelSid, client){
  return client.chat.services(flexChatService).channels(channelSid).webhooks.list({limit: 10})
  .then((webhooks)=>{
    
    return webhooks;
  })
  .catch((err)=>{
    console.log("couldn't get webhooks");
    return null
  })
}


module.exports =  {createNewChannel};