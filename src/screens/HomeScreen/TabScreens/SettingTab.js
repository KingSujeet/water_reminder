import React, { useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import PushNotification from 'react-native-push-notification';

import { Strings, Colors } from '../../../assets';  // resources
import { clearDrinkInterval, showDrinkPopup, showNotification } from '../../../utills/UtillFunctions'; // utility functions
import { updateTableData, readfTableData } from '../../../db/DbCrudFunctions'; // db functions
import Queries from '../../../db/DbQueries';

const SettingTab = () => {
    // states
    const [language, setLanguage] = useState("English")
    const [reminder, setReminder] = useState("30 Minutes")

    const languageItems=[
        { label: 'English', value: 'English' },
        { label: 'Arabic', value: 'Arabic' },
    ]
    const reminderItems=[
        { label: '1 Minute', value: 1 },
        { label: '30 Minutes', value: 30 },
        { label: '45 Minutes', value: 45 },
        { label: '60 Minutes', value: 60 },
        { label: '90 Minutes', value: 90 },
    ]

    // reading reminder data from table_user
    const readReminderData = () => {
        readfTableData(
          Queries.select_reminder,
        ).then((results)=>{
            console.log("data: " + results.rows.item(0).reminder);
            let reminder = results.rows.item(0).reminder
            setReminder(reminder+ " Minutes")
            setReminderValue(reminder)
        
        }).catch(()=>{ console.log('no data found') })
    }

    // updating reminder schedule
    const updateReminderSchedule = () => {

        updateTableData(
            Queries.update_is_reminder_sch,
            ['true'],
            ).then(()=>{
              
           })        
  
      }
      
      // updating remiinder
    const updateReminder = (value) => {

         PushNotification.cancelAllLocalNotifications()

        clearDrinkInterval()

        updateTableData(
            Queries.update_reminder_is_reminder_sch,
            [value, 'false'],
            ).then(()=>{
                readReminderDataOnce()
           })

    }

    const readReminderDataOnce = () => {

        console.log('data once');

          readfTableData(
            Queries.select_reminder,
            ).then((results)=>{
                console.log("data: " + results.rows.item(0).reminder);
                let reminder = results.rows.item(0).reminder
                setReminder(reminder + " Minutes")
                showNotification(reminder)
                showDrinkPopup(reminder)
                updateReminderSchedule()
    
            }).catch(()=>{ console.log('no data found') })
          
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
const PickerOption = ({title='', pickerTitle='', pickerSubTitle='', item, type='', onCall}) =>{

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
