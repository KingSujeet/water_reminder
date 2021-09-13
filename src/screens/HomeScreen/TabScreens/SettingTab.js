import React, { useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { openDatabase } from 'react-native-sqlite-storage'
import PushNotification from 'react-native-push-notification';

import { Strings, Colors } from '../../../assets';
import { clearDrinkInterval, showDrinkPopup, showNotification } from '../../../utills/UtillFunctions';
import { updateTableData } from '../../../db/DbFunctions';

var db = openDatabase({ name: 'UserDatabase.db' });

const SettingTab = () => {

    const [language, setLanguage] = useState("English")
    const [reminder, setReminder] = useState("30 Minutes")

    const languageItems=[
        { label: 'English', value: 'English' },
        { label: 'Arabic', value: 'Arabic' },
    ]
    const reminderItems=[
        { label: '1 Minutes', value: 1 },
        { label: '45 Minutes', value: 45 },
        { label: '60 Minutes', value: 60 },
        { label: '90 Minutes', value: 90 },
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
                        setReminderValue(results.rows.item(0).reminder)
                    } else {
                      alert('No user found');
                    }
                  }
                );
              });
    }

    const updateReminderSchedule = () => {
        // db.transaction((tx) => {
        //   tx.executeSql(
        //     'UPDATE table_user set is_reminder_sch=?',
        //     ['true'],
        //     (tx, results) => {
        //       console.log('Results', results.rowsAffected);
        //       if (results.rowsAffected > 0) {
        //       } else alert('Updation Failed');
        //     }
        //   );
        // });

        updateTableData(
            'UPDATE table_user set is_reminder_sch=?',
            ['true'],
            ).then(()=>{
              
           })        
  
      }
      

    const updateReminder = (value) => {
        PushNotification.cancelAllLocalNotifications()
        clearDrinkInterval()
        // db.transaction((tx) => {
        //     tx.executeSql(
        //       'UPDATE table_user set reminder=?, is_reminder_sch=?',
        //       [value, 'false'],
        //       (tx, results) => {
        //         console.log('Results', results.rowsAffected);
        //         if (results.rowsAffected > 0) {
        //             readReminderDataOnce()
        //         } else alert('Updation Failed');
        //       }
        //     );
        //   });

        updateTableData(
            'UPDATE table_user set reminder=?, is_reminder_sch=?',
            [value, 'false'],
            ).then(()=>{
                readReminderDataOnce()
           })

    }

    const readReminderDataOnce = () => {
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
                    showNotification(results.rows.item(0).reminder)
                    showDrinkPopup(results.rows.item(0).reminder)
                    updateReminderSchedule()
                } else {
                  alert('No user found');
                }
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
