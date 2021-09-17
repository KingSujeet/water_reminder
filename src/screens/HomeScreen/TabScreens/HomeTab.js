import React, { useState, useEffect} from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native'
import Svg, { Circle } from 'react-native-svg';

import { Colors, Images, Strings } from '../../../assets';  // resources
import { updateTableData, insertTableData, readfTableData, createTable } from '../../../db/DbCrudFunctions'; // db functions
import Queries from '../../../db/DbQueries';

const WAVE_HEIGHT = 160

const HomeTab = () => {
    // states
    const [ waterAmount, setWaterAmount ] = useState(0)
    const [ consumedWater, setConsumedWater ] = useState(null)
    const [ dailydWaterAmount, setDailyWaterAmount ] = useState(null)
    const [ waterList, setWaterList ] = useState([])

    const waterAmountPercentage = waterAmount*WAVE_HEIGHT/100

    // reading data from table_user
    const readDbData = () => {

          readfTableData(
            Queries.select_consumed_water_amount_daily_water_amount_water_amount
            ).then((results)=>{
                console.log("data: " + results.rows.item(0).consumed_water_amount);
                let consumed_water_amount = results.rows.item(0).consumed_water_amount
                let daily_water_amount = results.rows.item(0).daily_water_amount
                let water_amount = results.rows.item(0).water_amount
                setConsumedWater(consumed_water_amount)
                setDailyWaterAmount(daily_water_amount)
                setWaterAmount(water_amount)
                console.log("water amount: "+waterAmount)
    
            }).catch(()=>{ console.log('no data found') })

    }

    // creating record_list table 
    const createItemListTable = () => {

          createTable(
            Queries.select_record_list_table,
            Queries.drop_record_list,
            Queries.create_record_list_table
          ).then(()=>{
            console.log('table created successfully')
          })
    }

    // reading list from record_list table
    const readAllItemList = () => {

          readfTableData(
            Queries.select_lis_from_record_list,
            ).then((results)=>{
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                  temp.push(results.rows.item(i));
                setWaterList(temp);
    
            }).catch(()=>{ console.log('no data found') })
    }
    
    
    // inserting data to record_list table
    const insertListTable = (value) => {

        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        console.log("current time: ", hours+":"+min);

        const currentTime = (min>=0 && min<10)? hours+":0"+min : hours+":"+min

          insertTableData(
             Queries.insert_data_into_record_list_table,
             [currentTime, value])
          .then(()=>{
           
          })
    }
    

    const addWaterAmount = (value) => {

        updateTableData(
         Queries.update_consumed_water_amount_and_water_amount,
         [(consumedWater+200), value]
         ).then(()=>{
            readDbData()
            createItemListTable()
            insertListTable(200)
            readAllItemList()
        })   
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

const WaterFillComponent = ({waterAmountPercentage = '', waterAmount = '', consumedWater='', dailydWaterAmount='',onCallBack =()=>{}}) =>{
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