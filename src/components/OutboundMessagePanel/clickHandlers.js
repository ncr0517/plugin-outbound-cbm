import { Actions } from "@twilio/flex-ui";
//const axios = require('axios');
//import { Client } from "@twilio/conversations";
//import * as Twilio from '@twilio';
const twilio = require('twilio');

export const handleClose = () => {
  Actions.invokeAction("ToggleOutboundMessagePanel");
};

// Actions.registerAction("ForceConversationClose", (payload) => {
//   // const url = 'https://pleaspeds-9612.twil.io/delete_conversations';

//   // axios.post(url, {
//   //   PatientNumber: payload.destination
//   // }, {
//   //   auth: {
//   //     username: process.env.FLEX_APP_ACCOUNT_SID,
//   //     password: process.env.FLEX_APP_AUTH_TOKEN
//   //   }
//   // })
//   // .then(response => {
//   //   console.log('Function response:', response.data);
//   // })
//   // .catch(error => {
//   //   console.error('Error calling Twilio Function:', error);
//   // });
//   // const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
//   // client.conversations.v1.participantConversations
//   // .list({address: payload.destination, limit: 20})
//   // .then(participantConversations => participantConversations.forEach(p => 
//   //   {
//   //   // console.log(p.conversationSid);
//   //   // console.log(p);
//   //   client.conversations.v1.conversations(p.conversationSid)
//   //                      .remove();
//   //   }))
// });

export const onSendClickHandler = (
  menuItemClicked,
  toNumber,
  messageType,
  messageBody
) => {
  // default is open a chat task which would have had the message added
  let payload = {
    destination: messageType === "whatsapp" ? "whatsapp:" + toNumber : toNumber,
    callerId:
      messageType === "whatsapp"
        ? "whatsapp:" + process.env.FLEX_APP_TWILIO_WHATSAPP_FROM_NUMBER
        : process.env.FLEX_APP_TWILIO_FROM_NUMBER,
    body: messageBody,
    openChat: true,
    routeToMe: true,
  };

  // defer opening a task until customer replies
  switch (menuItemClicked) {
    case "SEND_MESSAGE_REPLY_ME":
      payload.openChat = false;
      payload.routeToMe = true;
      break;

    case "SEND_MESSAGE":
      payload.openChat = false;
      payload.routeToMe = false;
      break;
    case "OVERRIDE":
      Actions.invokeAction("ForceConversationClose", payload);

  }

  Actions.invokeAction("SendOutboundMessage", payload);
  Actions.invokeAction("ToggleOutboundMessagePanel");
};
