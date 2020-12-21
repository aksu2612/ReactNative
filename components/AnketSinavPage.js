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
  class AnketSinavPage extends Component {
    constructor(props) {
        super(props); 
    }
  
  
    render() {  
    const {data}=this.props.route.params
    console.log(data+"id mi");
        return (
          <View style={styles.container}>
            <Button
              title="AnketPage" 
              onPress={() =>this.props.navigation.navigate('AnketPage',{data:data})}
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
      backgroundColor: '#6ebb83',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
export default AnketSinavPage
