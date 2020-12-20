
import React , { Component } from 'react';
import { Button, View } from 'react-native';  
let surveysQuestion=[];



class AnketSoruPage extends Component  {   
    constructor(props) {
        super(props);
        this.getSurveyID=this.getSurveyID.bind(this);
    }
  componentDidMount(){
  
    this.getSurveyID();
    
  }
   getSurveyID= async () => {
        try {
          let response = await fetch(
            'http://192.168.1.4:45455//api/QuestionTypeFiveChoseSurveys'
          );
          let json = await response.json(); 
          surveysQuestion=json;   
           console.log(json)
          return json;
        } catch (error) {
          console.error(error);
        } 
      }
       
    render(){  
    console.log(this.props.route.params )
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
        <Button
          title="Ankete Başla"
          onPress={() => this.props.navigation.navigate('AnketQuestions' )}
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