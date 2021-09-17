import React, {useState} from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import WheelPicker from 'react-native-wheely';

import { NextButton, CommonHeader } from '../../components'  // custom components
import { generateArray } from '../../utills/UtillFunctions';  // utility functions
import { Images, Colors, Styles, Strings } from '../../assets'; // resources

const ChooseYourWeightScreen = ({navigation, route}) => {

    const genderType = route.params.genderType
    const arrayOfWeight = generateArray(20,150)
    const imgChooseWight = ( genderType === Strings.female) ? Images.chooseWeightMale: Images.chooseWeightFemale 

    const [selected, setSelectedIndex] = useState(40);
    const weight = arrayOfWeight[selected]

    // onPress event
    const goToChooseWakeTimeScreen = () => {
        navigation.navigate('ChooseWakeTimeScreen', { genderType:genderType, weight:weight})
    }

    return (
        <View style={{flex:1}}>
            <CommonHeader headerText={Strings.Choose_Your_Weight} />
            <View style={Styles.chooseTimeContainer}>
                <Image style={styles.imgStyle} source={imgChooseWight} />
                <View style={styles.wheelContainerStyle}>
                    <WheelPicker
                        selectedIndex={selected}
                        options={arrayOfWeight}
                        itemTextStyle={styles.wheelItemStyle}
                        itemHeight={50}
                        selectedIndex={40}
                        visibleRest={1}
                        selectedIndicatorStyle={styles.selectedIndicatorStyle}
                        onChange={(index) => setSelectedIndex(index)}
                    />
                </View>
                <Text style={styles.kgTxtStyle}>KG</Text>
            </View>
            <NextButton 
               onPressTouch={()=>{ goToChooseWakeTimeScreen() }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wheelItemStyle:{
        fontSize:25, 
        color:Colors.primary
    },
    selectedIndicatorStyle:{
        borderColor:Colors.primary, 
        borderTopWidth:2,
        borderBottomWidth:2
    },
    kgTxtStyle:{
        fontSize:22, 
        fontWeight:'bold', 
        marginHorizontal:10, 
        color:Colors.primary
    },
    wheelContainerStyle:{
        width:80, 
        marginHorizontal:20, 
        marginLeft:30
    },
    imgStyle:{
        width:100, 
        height:250,
        resizeMode:'contain',
        marginHorizontal:20
    }
})

export default ChooseYourWeightScreen
