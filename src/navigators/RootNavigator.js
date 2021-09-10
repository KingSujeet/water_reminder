import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import Colors from '../assets/colors';
import SelectYourGender from '../screens/CalculationScreens/SelectGenderScreen';
import ChooseYourWeightScreen from '../screens/CalculationScreens/ChooseYourWeightScreen';
import ChooseWakeTimeScreen from '../screens/CalculationScreens/ChooseWakeTimeScreen';
import ChooseSleepingTimeScreen from '../screens/CalculationScreens/ChooseSleepingTimeScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
          name="Splash" 
          component={SplashScreen}
          options={{ title: 'Water Reminder',
            headerBackVisible:false,
            headerShown:false,
            headerStyle:{backgroundColor:Colors.primary},
            headerTitleStyle:{color:Colors.primaryText, fontWeight:'bold'}
         }}
        />
       <Stack.Screen 
          name="SelectYourGender" 
          component={SelectYourGender}
          options={{ title: 'Water Reminder',
            headerBackVisible:false,
            headerStyle:{backgroundColor:Colors.primary},
            headerTitleStyle:{color:Colors.primaryText, fontWeight:'bold'}
         }}
        />
        <Stack.Screen 
          name="ChooseYourWeightScreen" 
          component={ChooseYourWeightScreen}
          options={{ title: 'Water Reminder',
            headerBackVisible:false,
            headerStyle:{backgroundColor:Colors.primary},
            headerTitleStyle:{color:Colors.primaryText, fontWeight:'bold'}
         }}
        />
        <Stack.Screen 
          name="ChooseWakeTimeScreen" 
          component={ChooseWakeTimeScreen}
          options={{ title: 'Water Reminder',
            headerBackVisible:false,
            headerStyle:{backgroundColor:Colors.primary},
            headerTitleStyle:{color:Colors.primaryText, fontWeight:'bold'}
         }}
        />
        <Stack.Screen 
          name="ChooseSleepingTimeScreen" 
          component={ChooseSleepingTimeScreen}
          options={{ title: 'Water Reminder',
            headerBackVisible:false,
            headerStyle:{backgroundColor:Colors.primary},
            headerTitleStyle:{color:Colors.primaryText, fontWeight:'bold'}
         }}
        />
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Water Reminder',
             headerBackVisible:false,
             headerStyle:{backgroundColor:Colors.primary},
             headerTitleStyle:{color:Colors.primaryText, fontWeight:'bold'}
            }}
        />
        
    </Stack.Navigator>
  );
};

export default RootNavigator;