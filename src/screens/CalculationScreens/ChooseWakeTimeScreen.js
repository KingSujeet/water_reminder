import React, {useState} from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import WheelPicker from 'react-native-wheely';

import { NextButton, CommonHeader } from '../../components'
import { getArrayTime } from '../../utills/UtillFunctions';
import { Styles, Images, Strings } from '../../assets';

const ChooseWakeTimeScreen = ({navigation, route}) => {

    const genderType = route.params.genderType
    const imgWakeUpTime = ( genderType === "female") ? Images.wakeUpTime: Images.wakeUpTimeFemale 

    const arrayOfHour = getArrayTime(0,23)
    const arrayOfMin = getArrayTime(0,59)

    const [selectedHour, setSelectedhourIndex] = useState(0);
    const [selectedMin, setSelectedminIndex] = useState(0);

    const wakeUpTimeValue = arrayOfHour[selectedHour] + " : " + arrayOfMin[selectedMin]

    const goToChooseSleepTimeScreen = () => {
        navigation.navigate('ChooseSleepingTimeScreen',{
            genderType: genderType, 
            weight:route.params.weight,
            wakeUpTime: wakeUpTimeValue,
        })
    }

    return (
        <View style={{flex:1}}>
            <CommonHeader headerText={Strings.Choose_Your_Wake_Up_Time} />
            <View style={Styles.chooseTimeContainer}>
                <Image style={styles.imgStyle} source={imgWakeUpTime} />
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
                        selectedIndex={18}
                        visibleRest={1}
                        selectedIndicatorStyle={Styles.selectedIndicatorStyle}
                        onChange={(index) => setSelectedminIndex(index)}
                    />
                </View>

            </View>
            
            <NextButton 
               onPressTouch={()=>{ goToChooseSleepTimeScreen() }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    imgStyle:{
        width:100, 
        height:250,
        resizeMode:'contain',
        marginHorizontal:10
    },
})

export default ChooseWakeTimeScreen
