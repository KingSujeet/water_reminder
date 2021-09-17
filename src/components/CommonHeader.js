import React from 'react'
import { StyleSheet, Text } from 'react-native'

const CommonHeader = ({headerText=''}) => {
    return (
        <Text style={styles.headerStyle}>{headerText}</Text>
    )
}

const styles = StyleSheet.create({
    headerStyle:{
        alignSelf:'center', 
        marginTop:20, 
        fontSize:18, 
        fontWeight:'bold'
    },
})

export default CommonHeader
