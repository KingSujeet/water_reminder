import React, {useState} from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import WheelPicker from 'react-native-wheely';

import NextButton from '../../components/NextButton'
import Images from '../../assets/images';
import Colors from '../../assets/colors';
import Strings from '../../assets/strings'
import { getArrayTime } from '../../utills/UtillFunctions';

const ChooseYourWeightScreen = ({navigation, route}) => {

    const genderType = route.params.genderType
    const arrayOfWeight = getArrayTime(20,150)
    const imgChooseWight = ( genderType === "female") ? Images.chooseWeightMale: Images.chooseWeightFemale 

    const [selected, setSelectedIndex] = useState(40);
    const weight = arrayOfWeight[selected]
    const goToChooseWakeTimeScreen = () => {
        navigation.navigate('ChooseWakeTimeScreen', { genderType:genderType, weight:weight})
    }

    return (
        <View style={{flex:1}}>
            <Text style={styles.headerStyle}>{Strings.Choose_Your_Weight}</Text>
            <View style={styles.chooseWeightContainer}>
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
    headerStyle:{
        alignSelf:'center', 
        marginTop:20, 
        fontSize:18, 
        fontWeight:'bold'
    },
    chooseWeightContainer:{
        alignSelf:'center', 
        flex:0.9, 
        justifyContent:'center', 
        alignItems:'center',
        flexDirection:'row'
    },
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
