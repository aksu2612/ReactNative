import React , { Component } from 'react';
import { Button, View,Text ,TouchableOpacity} from 'react-native'; 
import { SafeAreaView, FlatList, StyleSheet, StatusBar,Animated } from 'react-native';
 
let surveys=[]
let exams=[]; 
let user=[{
  Name: "asd",
  BolgeID:'',
  SurveyID:'',
  BelgeIDtxt:'',
  country:''
}];;
  class AnketSinavPage extends Component {
    constructor(props) {
        super(props); 
    
    }
    componentDidMount(){
      const {data}=this.props.route.params   
      let params={ 
        Name:global.MyVar,
        BolgeID:data
      }  
      fetch('http://192.168.1.4:45455//api/Participants/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id:0, 
          Name: params.Name,
          BolgeID:params.BolgeID
         
        })
      }).then(response=>response.json())
      .then(response=>{global.user=response.ID; })

 
         


      global.user=data; 
      console.log(global.user+"useer");
    }
  
  
    render() {  

      const {data}=this.props.route.params   
  
        return (
          <View style={styles.container}>
            <Button
              title="AnketPage" 
              onPress={() =>this.props.navigation.navigate('AnketPage',{data:data})}
            />
              <Button
              title="SinavPage"
              onPress={() => this.props.navigation.navigate('SinavPage')}
            />
            <Button title="Go back" onPress={() => this.props.navigation.goBack()} />
          </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#6ebb83',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
export default AnketSinavPage
