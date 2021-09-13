import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet} from 'react-native'

import { Colors, Strings } from '../assets'

const NextButton = ({ onPressTouch }) => {
    return (
        <TouchableOpacity style={styles.btnStyle} onPress={ onPressTouch } >
            <View style={styles.btnInnerStyle}>
                <Text style={{textAlign:'center'}}>{Strings.next}</Text>
            </View>
         </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnStyle:{
        width:'70%', 
        alignSelf:'center', 
        position:'absolute', 
        bottom:60
    },
    btnInnerStyle:{
        padding:13,
        borderRadius:30, 
        borderColor:Colors.primary, 
        borderWidth:1,
    }
})

export default NextButton
