import React, {useEffect} from 'react'
import { View } from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage'

import { updateTableData } from '../db/DbFunctions';

var db = openDatabase({ name: 'UserDatabase.db' });

const SplashScreen = ({navigation}) => {

    const checkUser = () => {
        db.transaction((tx) => {
            tx.executeSql(
              'SELECT daily_water_amount FROM table_user',
              [],
              (tx, results) => {
                var len = results.rows.length;
                console.log('len', len);
                if (len > 0) {
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
                } else {
                    console.log('no data found');
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'SelectYourGender'}],
                      });
                }
              }
            );
          });
    }

    const updateDbData = () => {
      var d1 = new Date().getDate().toString();
      // db.transaction((tx) => {
      //   tx.executeSql(
      //     'UPDATE table_user set water_amount=?, consumed_water_amount=?, today_date=?',
      //     [0,0,d1],
      //     (tx, results) => {
      //       console.log('Results', results.rowsAffected);
      //       if (results.rowsAffected > 0) {
      //       } else alert('Updation Failed');
      //     }
      //   );
      // });

      updateTableData('UPDATE table_user set water_amount=?, consumed_water_amount=?, today_date=?', [0,0,d1])
      .then(()=>{
         console.log('update success')
      })

      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM record_list WHERE consumed_water_amount=?',
          [200],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
            } else alert('Updation Failed');
          }
        );
      });

      
    }
    
    
    const createDb = () => {
        db.transaction(function (txn) {
            txn.executeSql(
              "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
              [],
              function (tx, res) {
                console.log('item:', res.rows.length);
                if (res.rows.length == 0) {
                  txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                  txn.executeSql(
                    'CREATE TABLE IF NOT EXISTS table_user(id INTEGER PRIMARY KEY AUTOINCREMENT, daily_water_amount INT(5), consumed_water_amount INT(5), water_amount INT(5), reminder INT(5), is_reminder_sch VARCHAR(5), wake_up_time VARCHAR(5), sleeping_time VARCHAR(5), today_date VARCHAR(5))',
                    []
                  );
                }
              }
            );
          });
    }

    const checkDate = () => {
     
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT today_date FROM table_user',
          [],
          (tx, results) => {
            var len = results.rows.length;
            console.log('lenthy', len);
            if (len > 0) {
              var d1 = new Date().getDate().toString();
              if(results.rows.item(0).today_date === d1){
              }else{
                updateDbData()
              }

            } else {
                console.log('no data found');
            }
          }
        );
      });
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
