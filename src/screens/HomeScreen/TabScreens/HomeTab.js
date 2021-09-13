import React, { useState, useEffect} from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native'
import Svg, { Circle } from 'react-native-svg';
import { openDatabase } from 'react-native-sqlite-storage';

import { Colors, Images, Strings } from '../../../assets';
import { updateTableData } from '../../../db/DbFunctions';

var db = openDatabase({ name: 'UserDatabase.db' });
const WAVE_HEIGHT = 160

const HomeTab = () => {

    const [ waterAmount, setWaterAmount ] = useState(0)
    const [ consumedWater, setConsumedWater ] = useState(null)
    const [ dailydWaterAmount, setDailyWaterAmount ] = useState(null)
    const [ waterList, setWaterList ] = useState([])

    const waterAmountPercentage = waterAmount*WAVE_HEIGHT/100

    const readDbData = () => {
        db.transaction((tx) => {
            tx.executeSql(
              'SELECT consumed_water_amount, daily_water_amount, water_amount FROM table_user',
              [],
              (tx, results) => {
                var len = results.rows.length;
                console.log('len', len);
                if (len > 0) {
                    console.log("data: " + results.rows.item(0).consumed_water_amount);
                    setConsumedWater(results.rows.item(0).consumed_water_amount)
                    setDailyWaterAmount(results.rows.item(0).daily_water_amount)
                    setWaterAmount(results.rows.item(0).water_amount)
                    console.log("water amount: "+waterAmount)
                } else {
                  alert('No user found');
                }
              }
            );
          });

    }

    const createItemListTable = () => {
        db.transaction(function (txn) {
            txn.executeSql(
              "SELECT name FROM sqlite_master WHERE type='table' AND name='record_list'",
              [],
              function (tx, res) {
                console.log('item:', res.rows.length);
                if (res.rows.length == 0) {
                  txn.executeSql('DROP TABLE IF EXISTS record_list', []);
                  txn.executeSql(
                    'CREATE TABLE IF NOT EXISTS record_list(id INTEGER PRIMARY KEY AUTOINCREMENT, time_of_drink VARCHAR(5), consumed_water_amount INT(5))',
                    []
                  );
                }
              }
            );
          });
    }

    const readAllItemList = () => {
        db.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM record_list',
              [],
              (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                  temp.push(results.rows.item(i));
                setWaterList(temp);
              }
            );
          });
    }
    
    
    const insertListTable = (value) => {

        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        console.log("current time: ", hours+":"+min);

        const currentTime = (min>=0 && min<10)? hours+":0"+min : hours+":"+min
        db.transaction(function (tx) {
            tx.executeSql(
              'INSERT INTO record_list ( time_of_drink, consumed_water_amount) VALUES (?,?)',
              [currentTime, value],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                 
                } else alert('db Failed to save');
              }
            );
          });
    }
    

    const addWaterAmount = (value) => {
        // db.transaction((tx) => {
        //     tx.executeSql(
        //       'UPDATE table_user set consumed_water_amount=?, water_amount=?',
        //       [(consumedWater+200), value],
        //       (tx, results) => {
        //         console.log('Results', results.rowsAffected);
        //         if (results.rowsAffected > 0) {
        //         } else alert('Updation Failed');
        //       }
        //     );
        //   });

        updateTableData(
         'UPDATE table_user set consumed_water_amount=?, water_amount=?',
         [(consumedWater+200), value]
         ).then(()=>{
            
        })
  
          readDbData()
          createItemListTable()
          insertListTable(200)
          readAllItemList()
    }
    
    
    useEffect(() => {
            readDbData()
            readAllItemList()
      }, []);

    return (
        <ScrollView >
            <WaterFillComponent
                waterAmountPercentage={waterAmountPercentage}
                waterAmount={waterAmount}
                consumedWater={consumedWater}
                dailydWaterAmount={dailydWaterAmount}
                onCallBack={(value)=>{ addWaterAmount(value) }}
            />
            { waterList.length >0?
      
                <View style={{marginTop:40, margin:20}}>
                <Text style={{color:'grey', marginBottom:15}}>{Strings.recordsTxt}</Text>
                <WaterRecordItemList 
                    DATA={waterList}
                />
            </View>
             :
             <Text style={{fontSize:25,alignSelf:'center',fontWeight:'bold',marginTop:40,color:Colors.primary}}>Get Hydrated</Text>  
            }
        </ScrollView>
    )
}

/**
 * WaterRecordItemList component
 */
const WaterRecordItemList = ({DATA}) => {
    return(
            <FlatList
                data={DATA}
                renderItem={waterRecordItem}
                keyExtractor={item => item.id}
            />
    )
}


/**
 * WaterRecordItem component
 */
const waterRecordItem = ({item}) => {
    return(
        <View >
            <View style={_styles.glassRecordItemStyle}>
                <Image style={{width:25, height:25}} source={Images.glassIcon} />
                <Text style={{alignSelf:'center', marginLeft:15}}>{item.time_of_drink}</Text>
                <Text style={_styles.glassItemTextStyle}>{Strings.waterUnit}</Text>
            </View>
        </View>
    )
}


/**
 * WaterFill component
 */

const WaterFillComponent = ({waterAmountPercentage, waterAmount, consumedWater, dailydWaterAmount ,onCallBack}) =>{
    return(
        <View>
            <View style={_styles.outerCircle}>
                <Svg height={waterAmountPercentage} style={{transform: [{rotateX: '180deg'}], marginTop: WAVE_HEIGHT- waterAmountPercentage}}>
                    <Circle cx="80" cy="80" r="80" fill={Colors.primary}/>
                </Svg>
                <Text style={_styles.waterFillCompInnerTxt}>{consumedWater} / {dailydWaterAmount} ml</Text>
            </View>

            <TouchableOpacity style={_styles.glassBtnStyle} onPress={()=>{ onCallBack(waterAmount+10) }}>
                <View style={_styles.innerGlassBtnStyle}>
                    <Image style={_styles.glassbtnImageStyle} source={Images.glassIcon} />
                    <Text style={_styles.glassBtnTextStyle}> {Strings.waterUnit}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const _styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
    },
    outerCircle: {
        width: WAVE_HEIGHT,
        height: WAVE_HEIGHT,
        borderRadius: 80,
        backgroundColor:Colors.lineColor,
        alignSelf:'center',
        marginTop:20
    },
    glassBtnStyle:{
        width:60,alignSelf:'center'
    },
    innerGlassBtnStyle:{
        marginTop:20 ,
        backgroundColor:Colors.primaryText,
        paddingTop:8,
        paddingLeft:8,
        paddingRight:8,
        paddingBottom:5,
        shadowColor: Colors.pickerHeaderColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        borderRadius:8,
        elevation:2
    },
    glassbtnImageStyle:{
        width:40,
        height:40, 
        alignSelf:'center'
    },
    glassBtnTextStyle:{
        fontSize:12, 
        textAlign:'center', 
        marginTop:5, 
        color:Colors.pickerHeaderColor
    },
    glassItemTextStyle:{
        fontSize:12, 
        textAlign:'center', 
        marginTop:5, 
        position:'absolute',
        right:15,
        alignSelf:'center',
        color:Colors.pickerHeaderColor
    },
    glassRecordItemStyle:{
        backgroundColor:Colors.primaryText,
        flexDirection:'row',
        paddingTop:8,
        paddingLeft:8,
        paddingRight:8,
        paddingBottom:8,
        shadowColor: Colors.pickerHeaderColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        borderRadius:2,
        elevation:2 
    },
    waterFillCompInnerTxt:{
        alignSelf:'center',
        marginTop:'45%', 
        fontSize:16, 
        color:Colors.primaryText, 
        position:'absolute', 
        fontWeight:'bold'
    }
});

export default HomeTab