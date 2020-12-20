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
export class AnketSinavPage extends Component {
    constructor(props) {
        super(props);
        this.Surveysfunc=this.Surveysfunc.bind(this);
        this.getExam=this.getExam.bind(this);
    }
    componentDidMount(){
        this.getExam();
        this.Surveysfunc();
    }
     getExam= async () => {
        try {
          let response = await fetch(
            'http://192.168.1.4:45455//api/ExamInfoes'
          );
          let json = await response.json(); 
          exams=json;   
         
          return json;
        } catch (error) {
          console.error(error);
        } 
      }
      
    
 Surveysfunc = async () => {
    console.log("Surveyfunc") 
    try {
      let response = await fetch(
        'http://192.168.1.4:45455/api/SurveyInfoes/'+user.BolgeID
      );
      let json = await response.json(); 
      surveys=json;  
      return json;
    } catch (error) {
      console.error(error);
    } 
  } 
    render() {  
    const {data}=this.props.route.params
        return (
          <View style={styles.container}>
            <Button
              title="AnketPage"
             
              onPress={() =>    this.props.navigation.navigate('AnketPage',{data:data})}
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
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
export default AnketSinavPage
