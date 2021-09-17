import React, {useState} from 'react'
import { View, StyleSheet, Image, Alert } from 'react-native'
import WheelPicker from 'react-native-wheely';

import { NextButton, CommonHeader } from '../../components' // custom components
import { generateArray, showAlert } from '../../utills/UtillFunctions'; // utility functions
import { Styles, Images, Strings } from '../../assets';  // resources
import { insertTableData } from '../../db/DbCrudFunctions';  // db functions
import Queries from '../../db/DbQueries';

const ChooseSleepingTimeScreen = ({navigation, route}) => {

    const genderType = route.params.genderType
    const weight = route.params.weight
    const wakeUpTime  = route.params.wakeUpTime
    const imgSleepTime = ( genderType === Strings.female) ? Images.sleepTime: Images.sleepTimeWomen 

    const arrayOfHour = generateArray(0,23)
    const arrayOfMin = generateArray(0,59)

    const [selectedHour, setSelectedhourIndex] = useState(0);
    const [selectedMin, setSelectedminIndex] = useState(0);

    const sleepingTimeValue = arrayOfHour[selectedHour] + " : " + arrayOfMin[selectedMin]

    // onPress event
    const goToHomeScreen = () => {

        var d1 = new Date().getDate()
        const query = Queries.insert_data_to_table_user_table

        // insert table data function
        insertTableData(query,
        [(weight*33), 0, 0, 30, 'false', wakeUpTime, sleepingTimeValue, d1])
        .then(()=>{
            showAlert(Strings.Success, Strings.success_alert_msg, 
                ()=>{ navigation.reset({ index: 0,routes: [{name: 'Home'}], })
             })
        })

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
