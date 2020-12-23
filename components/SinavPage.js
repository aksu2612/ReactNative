import React , { Component } from 'react';
import { Button, View,Text ,TouchableOpacity} from 'react-native'; 
import { SafeAreaView, FlatList, StyleSheet, StatusBar,Animated } from 'react-native';
 
let exams=[];
class SinavPage extends Component {  
    constructor(props) {
        super(props);
        this.state={
          examQuestions:[]
        }
        this.getExam=this.getExam.bind(this);
    }
    componentDidMount(){
        this.getExam();
    }
    getExam= async () => {
        try {
          let response = await fetch(
            'http://192.168.1.4:45455//api/ExamInfoes'
          );
          let json = await response.json(); 
          exams=json; 
          this.setState({
            examQuestions:json 
          })
           console.log(json)
          return json;
        } catch (error) {
          console.error(error);
        } 
      }


   render(){
  const renderItem = ({ item }) => (
    
    <Item title={item} /> 
  );
  
const Item = ({ title }) => (
  
  <View style={styles.item}>
    <TouchableOpacity onPress={() => {
          this.state.examQuestions =title ;   
      this.props.navigation.navigate('SurveyQuestion',{ data:this.state.examQuestions});
  }}>
    <Text style={styles.title}>{title.SinavAdi}</Text>
    </TouchableOpacity>
  </View>

);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>  
    <SafeAreaView style={styles.container}> 
        <FlatList 
          data={ this.state.examQuestions}
          renderItem={renderItem}
          keyExtractor={item => item.Id.toString()}
        /> 
      </SafeAreaView>  
      <Button
        title="Go to Notifications"
        onPress={() => navigation.navigate('Notifications')}
      /> 
    </View>
  );
}}
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
  
export default SinavPage;