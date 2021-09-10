import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Strings from '../../assets/strings'

import NextButton from '../../components/NextButton'
import Images from '../../assets/images'

const SelectYourGender = ({navigation}) => {

    const [ gender, setGender ] = useState('male')

    const goToChooseWeightScreen = () => {
        navigation.navigate('ChooseYourWeightScreen',{genderType:gender})
    }
    
    const selectGender = () => {
        if(gender === 'female')
            setGender('male')
        else
            setGender('female')  
    }
    

    return (
        <View style={{flex:1}}>
            <Text style={styles.headerStyle}>{Strings.Choose_Your_Gender}</Text>
            <View style={styles.selectGenderContainer}>
                { gender === "female" ?                 
                        <View style={{flexDirection:'row'}}>
                            <GenderSelect 
                                image={Images.maleSelectedImage}
                                gender='Male'
                            />
                             <GenderSelect 
                                image={Images.femaleImage}
                                onPress={()=>{ selectGender() }}
                                gender='Female'
                            />
                        </View>

                :   
                        <View style={{flexDirection:'row',}}>
                            <GenderSelect 
                                image={Images.maleImage}
                                onPress={()=>{ selectGender() }}
                                gender='Male'
                            />
                             <GenderSelect 
                                image={Images.femaleSelectedImage}
                                gender='Female'
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
const GenderSelect = ({image, onPress=()=>{}, gender}) => {
    
    return(
        <TouchableOpacity onPress={()=> onPress()}>
             <Image style={styles.genderImageStyle} source={image} />  
             <Text style={{marginTop:20, alignSelf:'center', fontSize:16}}>{gender}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    headerStyle:{
        alignSelf:'center', 
        marginTop:20, 
        fontSize:18, 
        fontWeight:'bold'
    },
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
