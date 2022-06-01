const simplePass = process.env.SIMPLE_PASS;

exports.handler = async function(context, event, callback) {
  
  let dest = event.to;
  let body = event.body;
  let auth = event.auth;

  const response = new Twilio.Response();
  // temp passphrase to trigger send;
  if (auth != simplePass) {
    response.setStatusCode(401);
    response.setBody("Unauthorized");
    return callback(null,response);
  }
  if (!dest || dest == '' || !body || body == '' ){
    response.setStatusCode(400);
    response.setBody("Missing params");
    return callback(null, response);
  }

  const {sendThroughViber} = require(Runtime.getFunctions()['adapters/viber'].path);

  let resp = await sendThroughViber(body,dest);

  return callback(null, {});
};