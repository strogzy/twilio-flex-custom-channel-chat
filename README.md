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


