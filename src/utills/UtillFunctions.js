import PushNotification from "react-native-push-notification"
import { Alert } from "react-native"

var interval = setInterval(()=>{})

export const getArrayTime = (start, end) => {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

export const showNotification = (reminderTime) => {
    console.log("reminder noti: " + reminderTime)
      PushNotification.localNotificationSchedule({
        id:123,
        message: "It's time to drink water !!!! ",
        date: new Date(Date.now()),
        allowWhileIdle: false,
        repeatTime: reminderTime,
        repeatType: 'minute',
      });
}

export const showDrinkPopup = (reminderTime) => {
  console.log(reminderTime);

  interval =  setInterval(() => {

    Alert.alert(
        'Its time to drink water !!!! ',
        'Now, its time to hydrate your self',
        [
          {
            text: 'Ok',
            onPress: () => {},
          },
        ],
        { cancelable: false }
      );

  }, reminderTime*60000);
}

export const clearDrinkInterval = () =>{

  clearInterval(interval);

}