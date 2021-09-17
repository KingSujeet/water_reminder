import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SelectYourGender from '../screens/CalculationScreens/SelectGenderScreen';
import ChooseYourWeightScreen from '../screens/CalculationScreens/ChooseYourWeightScreen';
import ChooseWakeTimeScreen from '../screens/CalculationScreens/ChooseWakeTimeScreen';
import ChooseSleepingTimeScreen from '../screens/CalculationScreens/ChooseSleepingTimeScreen';
import SplashScreen from '../screens/SplashScreen';
import { Strings,Colors } from '../assets';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
        
        <Stack.Group
          screenOptions={{ title: Strings.app_name,
          headerBackVisible:false,
          headerStyle:{backgroundColor:Colors.primary},
          headerTitleStyle:{color:Colors.primaryText, fontWeight:'bold'}}} >

            <Stack.Screen 
              name="Splash" 
              component={SplashScreen}
              options={{
                headerShown:false
              }}
            />
            <Stack.Screen 
             name="SelectYourGender" 
             component={SelectYourGender}
            />
            <Stack.Screen 
              name="ChooseYourWeightScreen" 
              component={ChooseYourWeightScreen}
            />
            <Stack.Screen 
              name="ChooseWakeTimeScreen" 
              component={ChooseWakeTimeScreen}
            />
            <Stack.Screen 
              name="ChooseSleepingTimeScreen" 
              component={ChooseSleepingTimeScreen}
            />
            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />
         
        </Stack.Group>

    </Stack.Navigator>
  );
};

export default RootNavigator;