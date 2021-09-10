import React, { useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { openDatabase } from 'react-native-sqlite-storage'

import Colors from '../../../assets/colors'
import Strings from '../../../assets/strings'


var db = openDatabase({ name: 'UserDatabase.db' });

const SettingTab = () => {

    const [language, setLanguage] = useState("English")
    const [reminder, setReminder] = useState("30 Minutes")

    const languageItems=[
        { label: 'English', value: 'English' },
        { label: 'Arabic', value: 'Arabic' },
    ]
    const reminderItems=[
        { label: '30 Minutes', value: '30 ' },
        { label: '45 Minutes', value: '45 ' },
        { label: '60 Minutes', value: '60 ' },
        { label: '90 Minutes', value: '90 ' },
    ]



    const readReminderData = () => {
            db.transaction((tx) => {
                tx.executeSql(
                  'SELECT reminder FROM table_user',
                  [],
                  (tx, results) => {
                    var len = results.rows.length;
                    console.log('len', len);
                    if (len > 0) {
                        console.log("data: " + results.rows.item(0).reminder);
                        setReminder(results.rows.item(0).reminder + " Minutes")
                    } else {
                      alert('No user found');
                    }
                  }
                );
              });
    }

    const updateReminder = (value) => {
        db.transaction((tx) => {
            tx.executeSql(
              'UPDATE table_user set reminder=?',
              [value],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    readReminderData()
                } else alert('Updation Failed');
              }
            );
          });
    }
    

    const changeValue = (type, value) => {

        if(type === 'language' && value != null)
            setLanguage(value)
        else if(type === 'reminder' && value != null)
            updateReminder(value)
    }
    
    useEffect(() => {
       readReminderData()
    }, []);

    return (
        <View>
            <PickerOption 
                title={Strings.langaugePickerHeader} 
                pickerTitle={Strings.languagePickerTitle} 
                pickerSubTitle={language}
                item={languageItems}
                type='language'
                onCall={(type,value) =>{ changeValue(type, value) }}
            />
            <View style={styles.line}></View>
            <PickerOption 
                title={Strings.reminderPickerHeader} 
                pickerTitle={Strings.reminderPickerTitle} 
                pickerSubTitle={reminder}
                item={reminderItems}
                type='reminder'
                onCall={(type,value) =>{ changeValue(type, value) } }
            />
        </View>
    )
}

/**
 * Pickeroption component
 */
const PickerOption = ({title='', pickerTitle='', pickerSubTitle='', item, type, onCall}) =>{

    return(
        <View style={styles.pickOptionContainer}>
            <Text style={styles.pickerHeaderTitleStyle}>{title}</Text>
                <RNPickerSelect
                    onValueChange={(value) => onCall(type,value)}
                    items={item}
                >
                    <View style={styles.pickOptionInnerStyle}>
                        <Text style={styles.pickerTitleStyle}>{pickerTitle}</Text>
                        <Text style={styles.pickerSubTitleStyle}>{pickerSubTitle}</Text>
                    </View>
                </RNPickerSelect>
        </View>
    )

}

const styles = StyleSheet.create({
    pickOptionContainer:{
        padding:15,
    },
    pickerHeaderTitleStyle:{
        color:Colors.pickerHeaderColor
    },
    pickOptionInnerStyle:{
        flexDirection:'row', 
        margin:10,
        padding:5,
    },
    pickerTitleStyle:{
        fontWeight:'800',
        flex:4
    },
    pickerSubTitleStyle:{
        position:'absolute', 
        right:2,
        alignSelf:'center'
    },
    line:{
        height:1,
        backgroundColor:Colors.lineColor
    }
})
 
export default SettingTab
