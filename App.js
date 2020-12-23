import React , { Component } from 'react';
import { Button, View ,Text ,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, FlatList, StyleSheet, StatusBar} from 'react-native'; 
import { TextInput } from 'react-native-gesture-handler';
import DropdownMenu from 'react-native-dropdown-menu'; 
import { LogBox } from 'react-native';
import AnketPage from './components/AnketPage';
import Bolge from './components/Bolge';
import SinavPage from './components/SinavPage';
import AnketSinavPage from './components/AnketSinavPage';
import AnketSoruPage from './components/AnketSoruPage';
import AnketQuestion from './components/AnketQuestion';
import ExamQuestion from './components/ExamQuestion';

let newData=[]; 
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
        'http://192.168.1.4:45455//api/Bolges'
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
              onChange={(data)=>{this.handlechange(data)}}
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
        onPress={() =>  this.props.navigation.navigate('Bolge') }
        />
    </View>
  );
} 
}  
const Stack = createStackNavigator();

class MyStack extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: false
    };
  }

render() { 
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AnketSinavPage" component={AnketSinavPage}  />
      <Stack.Screen name="Bolge" component={Bolge} />
      <Stack.Screen name="AnketPage" component={AnketPage}/>
      <Stack.Screen name="SinavPage" component={SinavPage} /> 
      <Stack.Screen name="AnketSoruPage" component={AnketSoruPage} /> 
      <Stack.Screen name="AnketQuestion" component={AnketQuestion} />  
      <Stack.Screen name="ExamQuestion" component={ExamQuestion} /> 
    </Stack.Navigator>
  );
} }
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
    backgroundColor: '#6ebb83',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;