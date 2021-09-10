import React, {useEffect} from 'react'
import { View } from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage'

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
                    'CREATE TABLE IF NOT EXISTS table_user(id INTEGER PRIMARY KEY AUTOINCREMENT, daily_water_amount INT(5), consumed_water_amount INT(5), water_amount INT(5), reminder INT(5))',
                    []
                  );
                }
              }
            );
          });
    }
    
    useEffect(() => {
        createDb()
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
