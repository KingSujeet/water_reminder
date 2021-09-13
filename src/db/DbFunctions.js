import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

export function updateTableData(query, dArr){
 
    return new Promise((resolve,reject)=>{
        db.transaction((tx) => {
            tx.executeSql(
              query,
              dArr,
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    resolve()
                } else {
                    console.log('update failed')
                    reject()
                }
              }
            );
          });
    })
    
}