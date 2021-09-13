import Colors from "./colors";

export default Styles={
    chooseTimeContainer:{
        alignSelf:'center', 
        flex:0.9, 
        justifyContent:'center', 
        alignItems:'center',
        flexDirection:'row'
    },
    wheelPickerItemStyle:{
        fontSize:25, 
        color:Colors.primary
    },
    selectedIndicatorStyle:{
        borderColor:Colors.primary, 
        borderTopWidth:2,
        borderBottomWidth:2
    },
};
