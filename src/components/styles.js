import {StyleSheet} from 'react-native'
import commonStyles from '../commonStyles'

export default styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        borderColor: '#AAA', 
        borderBottomWidth: 1,
        flexWrap:'wrap', 
        alignItems: 'center', 
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
    }, 
    checkContainer:{
        width:'20%',
        alignItems: 'center',
        justifyContent:'center',

    }, 
    pending:{
        height:25,
        width:25,
        borderRadius: 13,
        borderColor:'#555',
        borderWidth: 1,
        },
    done:{
        height:25,
        width:25,
        borderRadius: 13,
        borderColor:'#555',
        borderWidth: 1,
        backgroundColor:'green',
        alignItems: 'center',
        justifyContent:'center',
        }, 
    desc:{
        fontFamily:commonStyles.fontFamily,
        color:commonStyles.colors.mainText,
        fontSize:15
    },
    date:{
        fontFamily:commonStyles.fontFamily,
        color:commonStyles.colors.subText,
        fontSize:13
    },
    right:{
        
        backgroundColor:'#ba181b',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'flex-end',
        paddingHorizontal:20,
        paddingVertical:20,

    },
    left:{
        flex:1,
        backgroundColor:'#ba181b',
        flexDirection:'row',
        alignItems:'center',
        borderWidth:1
        

    },
    excludeText:{
            marginLeft:10

    },
    excludeIcon:{
        fontFamily:commonStyles.fontFamily,
        color:'white',
        fontSize:20,
        margin:10

},

})