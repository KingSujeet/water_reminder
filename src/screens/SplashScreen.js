import React, {useEffect} from 'react'
import { View } from 'react-native'

import { createTable, deleteTableData, readfTableData, updateTableData } from '../db/DbCrudFunctions'; // db functions
import Queries from '../db/DbQueries';

const SplashScreen = ({navigation}) => {

  // checking user already calculated daily water amount or not
    const checkUser = () => {
        readfTableData(
          Queries.get_daily_water_amount,
          ).then((results)=>{
            console.log("data: " + JSON.stringify(results.rows.item(0)));
            if(results.rows.item(0).daily_water_amount > 0){
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Home'}],
                });
            }else{
                navigation.reset({
                  index: 0,
                  routes: [{name: 'SelectYourGender'}],
            });
            }
  
          }).catch(()=>{
            console.log('no data found');
            navigation.reset({
              index: 0,
              routes: [{name: 'SelectYourGender'}],
            });
             })

    }

    // updating data
    const updateDbData = () => {
      var d1 = new Date().getDate().toString();

      updateTableData(Queries.update_waterAmount_consumedwater_todayDate, [0,0,d1])
      .then(()=>{
         console.log('update success')
      })
      
      deleteTableData(
        'DELETE FROM record_list WHERE consumed_water_amount=?',
        [200]
      ).then(()=>{
        console.log('delete success')
     })

      
    }
    
    // creating table table_user
    const createDb = () => {

        createTable(
          Queries.select_table_user_table,
          Queries.drop_table_user,
          Queries.create_table_user_table
        ).then(()=>{
          console.log('table created successfully')
        })


    }

    // checking date
    const checkDate = () => {

     
      readfTableData(
        Queries.select_today_date,
        ).then((results)=>{
          var d1 = new Date().getDate().toString();
          let today_date =results.rows.item(0).today_date
           if(today_date === d1){
           }else{
               updateDbData()
          }

        }).catch(()=>{ console.log('no data found') })

      readfTableData()

    }
    
    
    useEffect(() => {
        createDb()
        checkDate()
        const timeoutID = window.setTimeout(() => {
           checkUser()
        }, 100);
    
        return () => window.clearTimeout(timeoutID );
    }, []);

    return (
        <View>
            
        </View>
    )
}

export default SplashScreen
