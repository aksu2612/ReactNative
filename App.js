import React , { Component } from 'react';
import { Button, View,Picker,Text ,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, FlatList, StyleSheet, StatusBar,Animated } from 'react-native'; 
import { TextInput } from 'react-native-gesture-handler';
import DropdownMenu from 'react-native-dropdown-menu'; 
import { LogBox } from 'react-native';
let newData=[];
let surveys=[]; 
let exams=[];
let surveysQuestion=[];
let user=[{
  Name: "asd",
  BolgeID:'',
  SurveyID:'',
  BelgeIDtxt:'',
  country:''
}];
 
function  fillUserName(event ) {
  user.Name=event;
 console.log(event)
 
}
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
      BolgeArray:[],
      BolgeDizi:[],
      BolgeIDDizi:[],
      selectedValue:'',
  
    } 
  this.Bolges=this.Bolges.bind(this);
  this.handlechange=this.handlechange.bind(this); 
  }
   Bolges = async () => {
    try {
      let response = await fetch(
        'http://192.168.1.4:45457//api/Bolges'
      );
      let json = await response.json(); 
      newData=json;   
      this.setState({
        BolgeArray:newData
      })
      return json;
    } catch (error) {
      console.error(error);
    } 
  }
 
  componentDidMount(){
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
      this.Bolges();   
     
  }
  handlechange(){
console.log("asdku");
  }
  render(){    
       console.log(this.state.BolgeArray)
       this.state.BolgeArray.map((e)=>{
         this.state.BolgeDizi.push(e.BolgeAd);
         this.state.BolgeIDDizi.push(e.ID); 
        })
       
  return (
    <View style={{ flex:1, alignItems: 'center',  justifyContent: 'center',marginTop:90 }}>
       <TextInput placeholder="Kullanıcı Adı"
          style={{   alignItems: 'center', justifyContent: 'center'}}
        name={user.Name}
        value= {user.Name}
        onChange={(event) => fillUserName(event.nativeEvent.text)}
         > 
       </TextInput>  
         <DropdownMenu  
              onChange={(data)=>this.handlechange(data)}
              style={{flex: 1}}
              bgColor={'white'}
              tintColor={'#666666'}
              activityTintColor={'green'} 
              data={[this.state.BolgeDizi]}
            >  
          <View style={{maxWidth:150}}>
            <Text>{this.state.selectedValue }
              Kullanıcı Adı / Bölge Seçiniz
            </Text>
          </View> 
        </DropdownMenu>  
      <Button
        title="Giriş"
        onPress={() =>  this.props.navigation.navigate('Profile') }
        />
    </View>
  );
} 
} 
const getExam= async () => {
  try {
    let response = await fetch(
      'http://192.168.1.4:45457//api/ExamInfoes'
    );
    let json = await response.json(); 
    exams=json;   
     console.log(json)
    return json;
  } catch (error) {
    console.error(error);
  } 
}
const getSurveyID= async () => {
  try {
    let response = await fetch(
      'http://192.168.1.4:45457//api/QuestionTypeFiveChoseSurveys/'+surveys.ID
    );
    let json = await response.json(); 
    surveysQuestion=json;   
     console.log(json)
    return json;
  } catch (error) {
    console.error(error);
  } 
}
 
 
 
 
const Surveysfunc = async () => {
  console.log("Surveyfun") 
  try {
    let response = await fetch(
      'http://192.168.1.4:45457/api/SurveyInfoes/'+user.BolgeID
    );
    let json = await response.json();
   
    surveys=json;  
    return json;
  } catch (error) {
    console.error(error);
  } 
}
  
function ProfileScreen({ navigation }) {  

  const renderItem = ({ item }) => (
    
    <Item title={item} /> 
  );
  
const Item = ({ title }) => (
  
  <View style={styles.item}>
    <TouchableOpacity onPress={() => {
         user.BolgeID=title.ID;  
      navigation.navigate('Notifications');
  }}>
    <Text style={styles.title}>{title.BolgeAd}</Text>
    </TouchableOpacity>
  </View>

);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>   

    <SafeAreaView style={styles.container}> 
        <FlatList 
          data={newData}
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

function NotificationsScreen({ navigation }) { 
  Surveysfunc(); 
  getExam();
  console.log(user.BolgeID);
  return (
    <View style={styles.container}>
      <Button
        title="AnketPage"
        onPress={() => navigation.navigate('AnketPage')}
      />
        <Button
        title="SinavPage"
        onPress={() => navigation.navigate('SinavPage')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function AnketPage({ navigation }) {   
 
  const renderItem = ({ item }) => (
    
    <Item title={item} /> 
  );
  
const Item = ({ title }) => (
  
  <View style={styles.item}>
    <TouchableOpacity onPress={() => {
         surveys.ID=title.ID;  
      navigation.navigate('AnketSoruPage');
  }}>
    <Text style={styles.title}>{title.AnketAdi}</Text>
    </TouchableOpacity>
  </View>

);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>   

    <SafeAreaView style={styles.container}> 
        <FlatList 
          data={surveys}
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
function AnketSoruPage({ navigation }) {   
  getSurveyID(); 
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>   

      <Button
        title="Ankete Başla"
        onPress={() => navigation.navigate('AnketQuestions')}
      /> 
      <Button
        title="Geri"
        onPress={() => navigation.navigate('Notifications')}
      /> 
    </View>
  );
} 



function AnketQuestions({ navigation }) {   
   
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
function SinavPage({ navigation }) {    
 
  const renderItem = ({ item }) => (
    
    <Item title={item} /> 
  );
  
const Item = ({ title }) => (
  
  <View style={styles.item}>
    <TouchableOpacity onPress={() => {
         exams.ID=title.ID;  
      navigation.navigate('AnketSoruPage');
  }}>
    <Text style={styles.title}>{title.SinavAdi}</Text>
    </TouchableOpacity>
  </View>

);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>  
    <SafeAreaView style={styles.container}> 
        <FlatList 
          data={exams}
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
}
const Stack = createStackNavigator();

function MyStack() { 
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="AnketPage" component={AnketPage} /> 
      <Stack.Screen name="SinavPage" component={SinavPage} /> 
      <Stack.Screen name="AnketSoruPage" component={AnketSoruPage} /> 
      <Stack.Screen name="AnketQuestions" component={AnketQuestions} /> 
   
    </Stack.Navigator>
  );
} 
  class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      picture:''
    }
  } 
  render() { 
    return (
      <NavigationContainer>
        <MyStack /> 
      </NavigationContainer>
    )
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

export default App;