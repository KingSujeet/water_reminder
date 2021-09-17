import React, { useEffect } from 'react'

import { updateTableData, readfTableData } from '../../db/DbCrudFunctions'; // db functions
import Queries from '../../db/DbQueries';
import { showDrinkPopup, showNotification } from '../../utills/UtillFunctions'; // utility functions
import TabScreen from './TabScreens/TabScreen' 

const HomeScreen = () => {

  var reminderTime = 5

   // updating reminder schedule
    const updateReminderSchedule = () => {
      updateTableData(Queries.update_is_reminder_sch, ['true'])
      .then(()=>{
          
      })
    }

    // reading reminder time
    const readReminderTime = () => {

      readfTableData(
        Queries.select_reminder_is_reminder_sch
        ).then((results)=>{
            console.log("data: " + results.rows.item(0).reminder);
            reminderTime = results.rows.item(0).reminder
            console.log("reminder: " + reminderTime)
            let is_reminder_sch = results.rows.item(0).is_reminder_sch
            if(is_reminder_sch === 'true'){
            }
            else{
              showNotification(reminderTime)
              updateReminderSchedule()
              showDrinkPopup(reminderTime)
            }   

        }).catch(()=>{ console.log('no data found') })

    }
    
    useEffect(() => {
        readReminderTime()    
     }, []);

    return (
           <TabScreen />
    )
}

export default HomeScreen
