var admin = require("firebase-admin");
const Notification = require("../../models/Notification");

const sendNotifications = async ({
  title,
  body,
  img,
  receiverId,
  type,
  token
  
}) => {
  try {
    await admin.messaging().sendMulticast({
      tokens: [
        token,
        /* ... */
      ], // ['token_1', 'token_2', ...]
      notification: {
        title,
        body,
        imageUrl: img,
      },
    });

    if (receiverId) {
      const notif = new Notification({
        type,
        subject: title,
        message: body?.message,
        avatar: img,
        receiver: receiverId,
      });

      await notif.save();

      console.log(notif, "new notif")
    }
  } catch (err) {
    console.log(err, "erooro");
  }
};

module.exports = sendNotifications;
