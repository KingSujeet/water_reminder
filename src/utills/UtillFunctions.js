import PushNotification from "react-native-push-notification"
import { Alert } from "react-native"
import { Strings } from "../assets"

var interval = setInterval(()=>{})

export const generateArray = (start, end) => {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

export const showAlert = (title='', msg='', onPress=()=>{}) => {
  Alert.alert(
    title,
    msg,
    [
      {
        text: 'Ok',
        onPress: () => {onPress()},
      },
    ],
    { cancelable: false }
  );
}


export const showNotification = (reminderTime) => {
    console.log("reminder noti: " + reminderTime)
      PushNotification.localNotificationSchedule({
        id:'123',
        userInfo: {
          id:'123'
        },
        message: "It's time to drink water !!!! ",
        date: new Date(Date.now()),
        ignoreInForeground: true,
        allowWhileIdle: false,
        repeatTime: reminderTime,
        repeatType: 'minute',
      });
}


export const showDrinkPopup = (reminderTime) => {
  console.log(reminderTime);

  interval =  setInterval(() => {

    showAlert(Strings.reminder_alert_title, Strings.reminder_alert_msg)

  }, reminderTime*60000);
}

export const clearDrinkInterval = () =>{

  clearInterval(interval);

}