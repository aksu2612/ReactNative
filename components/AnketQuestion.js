 
import React , { Component } from 'react';
import { Button, View,Text ,TouchableOpacity} from 'react-native'; 
import { SafeAreaView, FlatList, StyleSheet, StatusBar,Animated } from 'react-native';
import CircularTimer from 'react-native-circular-timer'; 
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
let  surveysQuestionText=[] ;
  class AnketQuestion extends Component {
      constructor(props) {
          super(props);
          this.state={
            MaxSure:'',
            surveysQuestion:[], 
           

          }
          this.data = [
            { title: "Tab1", key: "item1", color: "blue" },
            { title: "Tab2", key: "item2", color: "yellow" }
          ];
          this.getSurveyID= this.getSurveyID.bind(this); 
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
            'http://192.168.1.4:45455//api/QuestionTypeFiveChoseSurveys/'+data.ID
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
    render() { 
        const renderItem = ({ item }) => ( 
          <Item title={item} /> 
        ); 
     
      const Item = ({ title }) => ( 
        <View style={styles.item}>
          <TouchableOpacity onPress={() => {
              surveys.ID=title.ID;  
            this.props.navigation.navigate('AnketSoruPage');
        }}>
          <Text style={styles.title}>{title.QuestionText}</Text>
          </TouchableOpacity>
        </View> 
      ); 
      let hms = this.state.MaxSure;    
      let a = hms.split(':');   
      let seconds = ((+a[1]) * 60 );   
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
       <View>
            <CircularTimer
               onComplete={() => {
                // do your stuff here
                return [true, 1500] // repeat animation in 1.5 seconds
              }}
              radius={70}
              seconds={300}
              ref={refs => (this._timerRef = refs)}
              onTimeElapsed={() => {
                console.log('Timer Finished!');
              }}
              showSecond={true}
            />
            <TouchableOpacity
              onPress={this._restartTimer}
              style={{
                marginTop: 20,
                borderRadius: 8,
                backgroundColor: '#000000'
              }}
            >
              <Text
                style={{
                  padding: 16,
                  fontSize: 18,
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                Restart Timer
              </Text>
            </TouchableOpacity>
          </View>
       
          <ProgressSteps   >
            <ProgressStep label="First Step" >
                <View style={{ alignItems: 'center' }}>
               <Text>asd</Text>
                </View>
            </ProgressStep>
            <ProgressStep label="Second Step">
                <View style={{ alignItems: 'center' }}>
                    <Text>This is the content within step 2!</Text>
                </View>
            </ProgressStep>
            <ProgressStep label="Third Step">
                <View style={{ alignItems: 'center' }}>
                    <Text>This is the content within step 3!</Text>
                </View>
            </ProgressStep>
       
        </ProgressSteps>
          <SafeAreaView style={styles.container}> 
            <FlatList 
              data={this.state.surveysQuestion}
              renderItem={renderItem}
              keyExtractor={item => item.ID.toString()}
            /> 
          </SafeAreaView>  
          <Button
            title="Go to Notifications"
            onPress={() => this.props.navigation.navigate('Notifications')}
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
