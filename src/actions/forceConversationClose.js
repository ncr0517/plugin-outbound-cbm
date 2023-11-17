import { Actions, Manager, Notifications } from "@twilio/flex-ui";
const manager = Manager.getInstance();

const forceConversationClose = async () => {
//   const body = {
//     ...sendOutboundParams,
//     Token: manager.store.getState().flex.session.ssoTokenPayload.token,
//   };

  //console.log("DEBUG body", body);

  const username = process.env.FLEX_APP_ACCOUNT_SID;
  const password = process.env.FLEX_APP_AUTH_TOKEN;

  const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');

  const options = {
    method: "POST",
    // body: new URLSearchParams(body),
    headers: {
      'Authorization': `Basic ${base64Credentials}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  };

  //const { OpenChatFlag, To } = sendOutboundParams;

  try {
    const resp = await fetch(
      `https://pleaspeds-9612.twil.io/delete_conversations`,
      options
    );
    const data = await resp.json();

    if (data.success) {
      Notifications.showNotification("outboundMessageSent", {
        message: To,
      });
    }

    if (!data.success) {
      Notifications.showNotification("outboundMessageFailed", {
        message: data.errorMessage,
      });
    }
  } catch (error) {
    console.error(error);
    Notifications.showNotification("outboundMessageFailed", {
      message: "Error calling sendOutboundMessage function",
    });
  }
};

// TODO - fallback and try and use outbound calling setup sids
// TODO - allow override of queue from action payload
Actions.registerAction("ForceConversationClose", (payload) => {
  if (!payload.callerId)
    payload.callerId = process.env.FLEX_APP_TWILIO_FROM_NUMBER;

  if (payload.openChat) {
    forceConversationClose();
  } 
});
