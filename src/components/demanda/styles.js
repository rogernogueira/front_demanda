import {StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get("window");
export default styles = StyleSheet.create({
  Text: {
    color:'#FC9702', 
    fontSize:13, 
    fontWeight:'bold', 
  },
  TextData: {
    color:'#FFF', 
    fontSize:13, 
    fontWeight:'bold', 

  },
  TextDescricao: {
    fontSize: 20,
    fontWeight: '200',
    marginBottom: 4,
    color: '#808080'
  },
  Container:{
     shadowColor: '#000000',
     shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 3,
      shadowOpacity: 0.5,
      height:100,
      width: window.width-10,
      
      
      backgroundColor: '#ffffff',
      borderRadius: 6,
      marginBottom: 4,

  }, 
  right:{
        
    backgroundColor:'#e1e1e1',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'flex-end',
    paddingHorizontal:20,
    paddingVertical:20,

},
left:{
    flex:1,
    backgroundColor:'#e1e1e1',
    flexDirection:'row',
    alignItems:'center',
    borderWidth:1
  },

excludeText:{
  color: '#F44336',

    }, 
}
)