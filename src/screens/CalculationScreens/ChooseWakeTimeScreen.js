import React, {useState} from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import WheelPicker from 'react-native-wheely';

import NextButton from '../../components/NextButton'
import Images from '../../assets/images';
import Colors from '../../assets/colors';
import Strings from '../../assets/strings'
import { getArrayTime } from '../../utills/UtillFunctions';

const ChooseWakeTimeScreen = ({navigation, route}) => {

    const genderType = route.params.genderType
    const imgWakeUpTime = ( genderType === "female") ? Images.wakeUpTime: Images.wakeUpTimeFemale 

    const arrayOfMin = getArrayTime(0,23)
    const arrauOfSec = getArrayTime(0,59)

    const [selected, setSelectedIndex] = useState(0);

    const goToChooseSleepTimeScreen = () => {
        navigation.navigate('ChooseSleepingTimeScreen',{genderType: genderType, weight:route.params.weight})
    }

    return (
        <View style={{flex:1}}>
            <Text style={styles.headerStyle}>{Strings.Choose_Your_Wake_Up_Time}</Text>
            <View style={styles.chooseWakeTimeContainer}>
                <Image style={styles.imgStyle} source={imgWakeUpTime} />
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
                        selectedIndex={18}
                        visibleRest={1}
                        selectedIndicatorStyle={styles.selectedIndicatorStyle}
                        onChange={(index) => setSelectedIndex(index)}
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
    headerStyle:{
        alignSelf:'center', 
        marginTop:20, 
        fontSize:18, 
        fontWeight:'bold'
    },
    chooseWakeTimeContainer:{
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
        width:100, 
        height:250,
        resizeMode:'contain',
        marginHorizontal:10
    },
})

export default ChooseWakeTimeScreen
