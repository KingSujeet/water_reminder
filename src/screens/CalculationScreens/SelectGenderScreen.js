import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import { NextButton, CommonHeader } from '../../components' // custom components
import { Images, Strings } from '../../assets'  // resources

const SelectYourGender = ({navigation}) => {

    const [ gender, setGender ] = useState(Strings.male)

    // onPress event
    const goToChooseWeightScreen = () => {
        navigation.navigate('ChooseYourWeightScreen',{genderType:gender})
    }
    
    const selectGender = () => {
        if(gender === Strings.female)
            setGender(Strings.male)
        else
            setGender(Strings.female)  
    }
    

    return (
        <View style={{flex:1}}>
            <CommonHeader headerText={Strings.Choose_Your_Gender} />
            <View style={styles.selectGenderContainer}>
                { gender === Strings.female ?                 
                        <View style={{flexDirection:'row'}}>
                            <GenderSelect 
                                image={Images.maleSelectedImage}
                                gender={Strings.Male}
                            />
                             <GenderSelect 
                                image={Images.femaleImage}
                                onPress={()=>{ selectGender() }}
                                gender={Strings.Female}
                            />
                        </View>

                :   
                        <View style={{flexDirection:'row',}}>
                            <GenderSelect 
                                image={Images.maleImage}
                                onPress={()=>{ selectGender() }}
                                gender={Strings.Male}
                            />
                             <GenderSelect 
                                image={Images.femaleSelectedImage}
                                gender={Strings.Female}
                            />
                        </View>
                }
                
            </View>
            <NextButton 
               onPressTouch={()=>{ goToChooseWeightScreen() }}
            />
        </View>
    )
}


/**
 * GenderSelect component
 */
const GenderSelect = ({image='', onPress=()=>{}, gender=''}) => {
    
    return(
        <TouchableOpacity onPress={()=> onPress()}>
             <Image style={styles.genderImageStyle} source={image} />  
             <Text style={{marginTop:20, alignSelf:'center', fontSize:16}}>{gender}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    genderImageStyle:{
        width:120, 
        height:120, 
        marginHorizontal:20
    },
    selectGenderContainer:{
        alignSelf:'center', 
        flex:0.9, 
        justifyContent:'center', 
        alignItems:'center'
    }
})

export default SelectYourGender
