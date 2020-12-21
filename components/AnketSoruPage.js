import React , { Component } from 'react';
import { Button, View,Text,TouchableOpacity } from 'react-native';  
import CircularTimer from 'react-native-circular-timer';
 
class AnketSoruPage extends Component  {   
    constructor(props) {
        super(props);
     this.state={
       question:this.props.route.params
     }
    }  
    componentDidMount(){
      const {data}=this.props.route.params
        this.setState({
          MaxSure:data 
        })
      console.log(data.MaxSure)
    }
  
    render(){  
      const {data}=this.props.route.params  
      return (
        <View style={{  flex:1, alignItems: 'center', justifyContent: 'center' }}>  
        <Text>AnketSüresi</Text>
        <Text>{data.MaxSure}</Text>
          <Button
            title="Ankete Başla"
            onPress={() => this.props.navigation.navigate('AnketQuestion',{data:data})}
          /> 
          <Button
            title="Geri"
            onPress={() => this.props.navigation.navigate('Notifications')}
          /> 
        </View>
      );
    } 
  }
 export default AnketSoruPage;