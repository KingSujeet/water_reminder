import React, {useState} from 'react'
import { View, StyleSheet, Image, Alert } from 'react-native'
import WheelPicker from 'react-native-wheely';
import { openDatabase } from 'react-native-sqlite-storage';

import { NextButton, CommonHeader } from '../../components'
import { getArrayTime } from '../../utills/UtillFunctions';
import { Styles, Images, Strings } from '../../assets';

var db = openDatabase({ name: 'UserDatabase.db' });

const ChooseSleepingTimeScreen = ({navigation, route}) => {

    const genderType = route.params.genderType
    const weight = route.params.weight
    const wakeUpTime  = route.params.wakeUpTime
    const imgSleepTime = ( genderType === "female") ? Images.sleepTime: Images.sleepTimeWomen 

    const arrayOfHour = getArrayTime(0,23)
    const arrayOfMin = getArrayTime(0,59)

    const [selectedHour, setSelectedhourIndex] = useState(0);
    const [selectedMin, setSelectedminIndex] = useState(0);

    const sleepingTimeValue = arrayOfHour[selectedHour] + " : " + arrayOfMin[selectedMin]

    const goToHomeScreen = () => {
        var d1 = new Date().getDate()
        db.transaction(function (tx) {
            tx.executeSql(
              'INSERT INTO table_user (daily_water_amount, consumed_water_amount, water_amount, reminder, is_reminder_sch, wake_up_time, sleeping_time, today_date ) VALUES (?,?,?,?,?,?,?,?)',
              [(weight*33), 0, 0, 30, 'false', wakeUpTime, sleepingTimeValue, d1],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'Tap on ok!',
                    [
                      {
                        text: 'Ok',
                        onPress: () => navigation.reset({ index: 0,routes: [{name: 'Home'}], }),
                      },
                    ],
                    { cancelable: false }
                  );
                } else console.log('db Failed to save');
              }
            );
          });
    }

    return (
        <View style={{flex:1}}>
            <CommonHeader headerText={Strings.Choose_Your_Sleeping_Time} />
            <View style={Styles.chooseTimeContainer}>
                    <Image style={styles.imgStyle} source={imgSleepTime} />
                    <View style={{width:70, marginLeft:30}}>
                        <WheelPicker
                            selectedIndex={selectedHour}
                            options={arrayOfHour}
                            itemTextStyle={Styles.wheelPickerItemStyle}
                            itemHeight={50}
                            selectedIndex={16}
                            visibleRest={1}
                            selectedIndicatorStyle={Styles.selectedIndicatorStyle}
                            onChange={(index) => setSelectedhourIndex(index)}
                            />
                        </View>
                    <View style={{width:70, marginLeft:10}}>
                        <WheelPicker
                            selectedIndex={selectedMin}
                            options={arrayOfMin}
                            itemTextStyle={Styles.wheelPickerItemStyle}
                            itemHeight={50}
                            selectedIndex={16}
                            visibleRest={1}
                            selectedIndicatorStyle={Styles.selectedIndicatorStyle}
                            onChange={(index) => setSelectedminIndex(index)}
                            />
                    </View>

            </View>
            
            <NextButton 
               onPressTouch={()=>{ goToHomeScreen() }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    imgStyle:{
        width:120, 
        height:270,
        resizeMode:'contain',
        marginHorizontal:10
    },
})

export default ChooseSleepingTimeScreen
