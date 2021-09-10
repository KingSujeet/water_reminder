import React, {useState} from 'react'
import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import WheelPicker from 'react-native-wheely';
import { openDatabase } from 'react-native-sqlite-storage';

import NextButton from '../../components/NextButton'
import Images from '../../assets/images';
import Colors from '../../assets/colors';
import Strings from '../../assets/strings'
import { getArrayTime } from '../../utills/UtillFunctions';

var db = openDatabase({ name: 'UserDatabase.db' });

const ChooseSleepingTimeScreen = ({navigation, route}) => {

    const genderType = route.params.genderType
    const weight = route.params.weight
    const imgSleepTime = ( genderType === "female") ? Images.sleepTime: Images.sleepTimeWomen 

    const arrayOfMin = getArrayTime(0,23)
    const arrauOfSec = getArrayTime(0,59)

    const [selected, setSelectedIndex] = useState(0);

    const goToHomeScreen = () => {

        db.transaction(function (tx) {
            tx.executeSql(
              'INSERT INTO table_user (daily_water_amount, consumed_water_amount, water_amount, reminder) VALUES (?,?,?,?)',
              [(weight*33), 0, 0, 30],
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
                } else alert('db Failed to save');
              }
            );
          });
    }

    return (
        <View style={{flex:1}}>
            <Text style={styles.headerStyle}>{Strings.Choose_Your_Sleeping_Time}</Text>
            <View style={styles.chooseSleepTimeContainer}>
                    <Image style={styles.imgStyle} source={imgSleepTime} />
                    <View style={{width:70, marginLeft:30}}>
                        <WheelPicker
                            selectedIndex={selected}
                            options={arrayOfMin}
                            itemTextStyle={styles.wheelPickerItemStyle}
                            itemHeight={50}
                            selectedIndex={16}
                            visibleRest={1}
                            selectedIndicatorStyle={styles.selectedIndicatorStyle}
                            onChange={(index) => setSelectedIndex(index)}
                            />
                        </View>
                    <View style={{width:70, marginLeft:10}}>
                        <WheelPicker
                            selectedIndex={selected}
                            options={arrauOfSec}
                            itemTextStyle={styles.wheelPickerItemStyle}
                            itemHeight={50}
                            selectedIndex={16}
                            visibleRest={1}
                            selectedIndicatorStyle={styles.selectedIndicatorStyle}
                            onChange={(index) => setSelectedIndex(index)}
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
    headerStyle:{
        alignSelf:'center', 
        marginTop:20, 
        fontSize:18, 
        fontWeight:'bold'
    },
    chooseSleepTimeContainer:{
        alignSelf:'center', 
        flex:0.9, 
        justifyContent:'center', 
        alignItems:'center',
        flexDirection:'row'
    },
    wheelPickerItemStyle:{
        fontSize:25, 
        color:Colors.primary
    },
    selectedIndicatorStyle:{
        borderColor:Colors.primary, 
        borderTopWidth:2,
        borderBottomWidth:2
    },
    imgStyle:{
        width:120, 
        height:270,
        resizeMode:'contain',
        marginHorizontal:10
    },
})

export default ChooseSleepingTimeScreen
