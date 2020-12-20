 
import React , { Component } from 'react';
import { Button, View,Text ,TouchableOpacity} from 'react-native'; 
import { SafeAreaView, FlatList, StyleSheet, StatusBar,Animated } from 'react-native';
let surveysQuestion=[];

  class AnketQuestion extends Component {
      constructor(props) {
          super(props);
          this.getSurveyID= this.getSurveyID.bind(this)
      }
      componentDidMount(){
       this.getSurveyID();
      }
      getSurveyID= async () => {
        try {
          let response = await fetch(
            'http://192.168.1.4:45455//api/QuestionTypeFiveChoseSurveys/1'+surveys.ID
          );
          let json = await response.json(); 
          surveysQuestion=json;   
           console.log(json)
          return json;
        } catch (error) {
          console.error(error);
        } 
      }
    render() {
        
  const renderItem = ({ item }) => (
    
    <Item title={item} /> 
  );
  
const Item = ({ title }) => (
  
  <View style={styles.item}>
    <TouchableOpacity onPress={() => {
         surveys.ID=title.ID;  
      navigation.navigate('AnketSoruPage');
  }}>
    <Text style={styles.title}>{title.QuestionText}</Text>
    </TouchableOpacity>
  </View>

);
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>   

 
      <SafeAreaView style={styles.container}> 
          <FlatList 
            data={surveysQuestion}
            renderItem={renderItem}
            keyExtractor={item => item.ID.toString()}
          /> 
        </SafeAreaView>  
        <Button
          title="Go to Notifications"
          onPress={() => navigation.navigate('Notifications')}
        /> 
      </View>
    );
    }
}

export default AnketQuestion
