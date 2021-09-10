import React, { useEffect } from 'react'
import { Alert } from 'react-native'
import PushNotification from 'react-native-push-notification'

import TabScreen from './TabScreens/TabScreen'

const HomeScreen = () => {

    const showDrinkPopup = () => {
        console.log('its drink time');
        Alert.alert(
            'Its Drink Water Time',
            'Now, its time to hydrate your self',
            [
              {
                text: 'Ok',
                onPress: () => {},
              },
            ],
            { cancelable: false }
          );
    }

    const showNotification = () => {

      PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        id:123,
        message: "My Notification Message", // (required)
        date: new Date(Date.now()), // in 60 secs
        allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
      
        /* Android Only Properties */
        repeatTime: 5, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
        repeatType: 'minute',
      });

    }
    
    useEffect(() => {
        // setInterval(() => {
        //   //  showNotification()
        // }, 10000);

         showNotification()
       
   
     }, []);

    return (
           <TabScreen />
    )
}

export default HomeScreen
