import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

// create table function
export function createTable(selectQuery, dropQuery, createQuery){
 
    return new Promise((resolve,reject)=>{
        db.transaction(function (txn) {
            txn.executeSql(
              selectQuery,
              [],
              function (tx, res) {
                console.log('item:', res.rows.length);
                if (res.rows.length == 0) {
                  txn.executeSql(dropQuery, []);
                  txn.executeSql(
                   createQuery,
                    []
                  );
                  resolve()
                }
              }
            );
          });
    })
    
}

// insert data to the table function
export function insertTableData(query, dArr){
 
    return new Promise((resolve,reject)=>{
        db.transaction(function (tx) {
            tx.executeSql(
              query,
              dArr,
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    resolve()
                } else{ 
                    console.log('db Failed to save'); 
                    reject()
                }
              }
            );
          });
    })
    
}

// read data from the table function
export function readfTableData(query){
 
    return new Promise((resolve,reject)=>{
        db.transaction((tx) => {
            tx.executeSql(
              query,
              [],
              (tx, results) => {
                var len = results.rows.length;
                console.log('lenthy', len);
                if (len > 0) {
                    resolve(results)
                } else {
                    console.log('no data found');
                    reject()
                }
              }
            );
          });
    })
    
}

// update data from the table
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

// delete data from the table
export function deleteTableData(query, dArr){
 
    return new Promise((resolve,reject)=>{
        db.transaction((tx) => {
            tx.executeSql(
              query,
              dArr,
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    resolve()
                } else alert('Updation Failed');
              }
            );
          });
    })
    
}