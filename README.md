# Serverless middleware for custom channels into Twilio Flex

## Overview
This is a Twilio Serverless adaption of Custom Web Chanel for Twilio Flex: https://github.com/vernig/twilio-flex-custom-webchat 

Related blog post: https://www.twilio.com/blog/add-custom-chat-channel-twilio-flex


## Install

1. Create a Studio Flow for handling the custom channel - you can use **StudioFlow.JSON** as an example.

2. Create a custom channel in Twilio Flex. Fill out your relevant details in **createCustomChannel.sh** and run it:
> `./createCustomChannel.sh`

3. Create a copy of the **.env** example file, rename it to **.env** and populate it with your relevant Env variables.
> `cp .env.example .env` 

4. Install the middleware dependencies and deploy it to a Twilio Serverless service
> ```
> npm install
> twilio serverless:deploy
> ```

Now the URL given as a result for the deploy command, specifically the url for the `/message` function can be used for sending messages into Flex. 

## Structure

`/functions`
In /functions you will find the code for Twilio Serverless functions which will act as the middleware between Twilio and Telerivet and will handle inbound and outbound messaging.



## Connectors

Currently this repo has adapters for the following custom channels:
- Viber
- Telerivet
- Telegram




## ToDo

- Check set webhooks. If new is different to existing, overwrite the webhooks so that old chats still work with new updated changes.
- Attach channel type not to webhook but to the participant attributes


