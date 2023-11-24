const webpush = require("web-push");

export const sendNotification = (
  endpoint: string,
  auth: string,
  p256dh: string,
  title: string,
  body: string
) => {
  const subscription = {
    endpoint: endpoint,
    expirationTime: null,
    keys: {
      auth: auth,
      p256dh: p256dh,
    },
  }; // new
  const payload = {
    notification: {
      title: title,
      body: body,
      icon: "assets/icons/icon-384x384.png",
      actions: [
        { action: "bar", title: "Focus last" },
        { action: "baz", title: "Navigate last" },
      ],
      data: {
        onActionClick: {
          default: { operation: "openWindow" },
          bar: {
            operation: "focusLastFocusedOrOpen",
            url: "/signin",
          },
          baz: {
            operation: "navigateLastFocusedOrOpen",
            url: "/signin",
          },
        },
      },
    },
  };
  const private_key = "xvJO9u-jvsrMQD_hXzyQTHSSXc5Jz9ltFKMBf8qtZIc";
  const public_key =
    "BFSlTgd4jZQCf71quwfwrrjcsEGLAwJMVuaXEnIAJ4HLfkb1EEcSVDjWdUA-QUpVbX7TIq-UH6Ryob__vB5flJI";
  const options = {
    vapidDetails: {
      subject: "mailto:example_email@example.com",
      publicKey: public_key,
      privateKey: private_key,
    },
    TTL: 60,
  };
  // send notification
  webpush
    .sendNotification(subscription, JSON.stringify(payload), options)
    .then((_: any) => {})
    .catch((_: any) => {
      console.log(_);
    });
};
