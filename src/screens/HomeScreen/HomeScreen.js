import React, { useEffect } from 'react'
import { openDatabase } from 'react-native-sqlite-storage';

import { updateTableData } from '../../db/DbFunctions';
import { showDrinkPopup, showNotification } from '../../utills/UtillFunctions';
import TabScreen from './TabScreens/TabScreen'

var db = openDatabase({ name: 'UserDatabase.db' });

const HomeScreen = () => {

  var reminderTime = 5

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

      updateTableData('UPDATE table_user set is_reminder_sch=?', ['true'])
      .then(()=>{
          alert('success ')
      })

    }
    

    const readReminderTime = () => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT reminder, is_reminder_sch FROM table_user',
          [],
          (tx, results) => {
            var len = results.rows.length;
            console.log('len', len);
            if (len > 0) {
                console.log("data: " + results.rows.item(0).reminder);
                reminderTime = results.rows.item(0).reminder
                console.log("reminder: " + reminderTime)
                if(results.rows.item(0).is_reminder_sch === 'true'){
                }
                else{
                  showNotification(reminderTime)
                  updateReminderSchedule()
                  showDrinkPopup(reminderTime)
                }   
            } else {
              alert('No user found');
            }
          }
        );
      });  

    }
    
    useEffect(() => {
        readReminderTime()    
     }, []);

    return (
           <TabScreen />
    )
}

export default HomeScreen
