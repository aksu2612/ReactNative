 
import React , { Component } from 'react';
import { Button, View,Text ,TouchableOpacity, Alert } from 'react-native'; 
import { SafeAreaView, FlatList, StyleSheet, StatusBar,Animated } from 'react-native';
import CircularTimer from 'react-native-circular-timer'; 
import RadioButtonRN from 'radio-buttons-react-native';
let  surveysQuestionText=[] ;
let  surveysQuestionArray=[] ;
let asd=[];
let option1=''
let option2=''
let option3=''
let option4=''
let option5=''
  class ExamQuestion extends Component {
      constructor(props) {
          super(props);
          this.state={
            MaxSure:'',
            surveysQuestion:[], 
           check:'',
           data : [
            {
              label: option1,
              value:option1,
              ID:0
             },
             {
              label: option2,
              value:option2,
              ID:0
             } ,
               {
                label: option3,
                value:option3,
                ID:0
               },
               {
                label: option4,
                value:option4,
                ID:0
               }, 
                   {
                label: option5,
                value:option5,
                ID:0
               },
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
     
   
        try {  
          let response = await fetch(
            'http://192.168.1.4:45455//api/QuestionTypeFiveChoseExams/'+data.Id
          );
          let json = await response.json(); 
          this.setState({surveysQuestion:json});    
          return json;
        } catch (error) {
          console.error(error);
        }  
      } 
      onChangeTab = index => {};
      _restartTimer = () => {
        if (this._timerRef) this._timerRef.restart();
      };
      submitAnswers(a){
      
       
      }
    render() { 
    
        const renderItem = ({ item }) => ( 
          <Item title={item} /> 
        ); 
     
        const Item = ({ title }) => ( 
          <View>{
                  this.state.surveysQuestion.map((e)=>{ 
            option1=title.Option1
            option2=title.Option2
            option3=title.Option3
            option4=title.Option4
            option5=title.Option5
        })
              }
            <View style={{marginVertical:8,padding: 30,backgroundColor:'#6ebb83'}}> 
              <Text style={styles.title}>{title.QuestionText}</Text> 
            </View>
            <View>
              <RadioButtonRN
                  data={[
                    {
                      label: option1,
                      value:option1,
                      ID:0
                     },
                     {
                      label: option2,
                      value:option2,
                      ID:0
                     } ,
                     {
                      label: option3,
                      value:option3,
                      ID:0
                     },
                     {
                      label: option4,
                      value:option4,
                      ID:0
                     }, 
                     {
                      label: option5,
                      value:option5,
                      ID:0
                     },
                    ]}
                  selectedBtn={(e) => 
                  {   
                    title.CorrectAnswer =e.value;  
                  }}
                /> 
            </View>  
          </View> 
        );  
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
              keyExtractor={item => item.Id.toString()}
            /> 
          </SafeAreaView>  
          <Button
            title="Anketi Bitir"
            onPress={() =>{ this.submitAnswers(asd);
               this.props.navigation.navigate('AnketPage')
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
export default ExamQuestion
