 
import React , { Component } from 'react';
import { Button, View,Text ,TouchableOpacity, Alert } from 'react-native'; 
import { SafeAreaView, FlatList, StyleSheet, StatusBar,Animated } from 'react-native';
import CircularTimer from 'react-native-circular-timer'; 
import RadioButtonRN from 'radio-buttons-react-native';
let  surveysQuestionText=[] ; 
let asd=[ {  BolgeID:0,  Name:'',}];
  class AnketQuestion extends Component {
      constructor(props) {
          super(props);
          this.state={
            MaxSure:'',
            surveysQuestion:[], 
            person:[],
           check:'',
           data : [
            {
              label: 'EVET',
              value:1,
              ID:0
             },
             {
              label: 'HAYIR',
              value:0,
              ID:0
             }
            ], 
              QuestionID:0,
              ParticipantID:0,
              Answer:'' 
          } 
          this.getSurveyID= this.getSurveyID.bind(this); 
          this.submitAnswers=this.submitAnswers.bind(this)
      }
      componentDidMount(){
       this.getSurveyID(); 
    
      }
      getSurveyID= async () => { 
        const {data}=this.props.route.params 
        this.setState({
          MaxSure:data.MaxSure
        })
        try {  
          let response = await fetch(
            'http://192.168.1.4:45455//api/QuestionTypeYesNoes/'+data.ID
          );
          let json = await response.json(); 
          this.setState({surveysQuestion:json});    
            this.state.surveysQuestion.map((e)=>{
              surveysQuestionText.push(e.QuestionText)
            })
          return json;
        } catch (error) {
          console.error(error);
        }  
      } 

      
      onChangeTab = index => {};
      _restartTimer = () => {
        if (this._timerRef) this._timerRef.restart();
      };
      submitAnswers(){  
        this.state.surveysQuestion.map((e)=>{
        let question={ 
              QuestionID:e.ID,
              ParticipantID:global.user,
              AnswerQuestion:e.Answer
            }   
            console.log("click");
       
        fetch('http://192.168.1.4:45455//api/Answers/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id:0, 
            QuestionID: question.QuestionID,
            ParticipantID:global.user,
            AnswerQuestion:question.AnswerQuestion
          })
        }).catch(err=>console.log(err)); 
      }) 
      alert("Anket Başarıyla Kaydedildi");
      this.props.navigation.navigate('AnketSinavPage')
      }
    render() { 
        const renderItem = ({ item }) => ( 
          <Item title={item} /> 
        ); 
     
        const Item = ({ title }) => ( 
          <View>
            <View style={{marginVertical:8,padding: 30,backgroundColor:'#6ebb83'}}> 
              <Text style={styles.title}>{title.QuestionText}</Text> 
            </View>
            <View>
              <RadioButtonRN
                  data={this.state.data}
                  selectedBtn={(e) => 
                  {   
                    title.Answer =e.value;  
                  }}
                /> 
            </View>  
          </View> 
        ); 
        let hms = this.state.MaxSure;    
        let a = hms.split(':');   
        let seconds = ((+a[1]) * 60 );   
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
          <View> 
            <CircularTimer 
              radius={45}
              seconds={300}
              ref={refs => (this._timerRef = refs)}
              onTimeElapsed={() =>  { 
                alert("Zaman Doldu");
                 this.props.navigation.navigate('AnketPage') }
              }
              showSecond={true}
            /> 
          </View>  
          <SafeAreaView style={styles.container}> 
            <FlatList 
              data={this.state.surveysQuestion}
              renderItem={renderItem}
              keyExtractor={item => item.ID.toString()}
            /> 
          </SafeAreaView>  
          <Button
            title="Anketi Bitir"
            onPress={() =>{ this.submitAnswers();
             
              }}
          /> 
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
export default AnketQuestion
