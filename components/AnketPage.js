import React , { Component } from 'react';
import { Button, View,Text ,TouchableOpacity} from 'react-native'; 
import { SafeAreaView, FlatList, StyleSheet, StatusBar,Animated } from 'react-native';


class AnketPage extends Component  { 
  constructor(props) {
      super(props);
      this.state={
          surveys:[],
          serveyID:{}, 
      }
   console.log(props.userBolgeID );
      this.Surveysfunc=this.Surveysfunc.bind(this);
  }
  componentDidMount(){
    const {data}=this.props.route.params
    this.setState({
      serveyID:data
    })  
        this.Surveysfunc(data); 
  }  
   Surveysfunc = async (data) => {   
    try {
      let response = await fetch(
        'http://192.168.1.4:45455/api/SurveyInfoes/'+data
      );
      let json = await response.json(); 
      this.setState({surveys:json}) ;   
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
           this.state.surveys=title;
           this.props.navigation.navigate('AnketSoruPage',{data:this.state.surveys});
       }}>
      <Text style={styles.title}>{title.AnketAdi}</Text>
      </TouchableOpacity>
    </View> 
  ); 
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
        <SafeAreaView style={styles.container}> 
          <FlatList 
            data={this.state.surveys}
            renderItem={renderItem}
            keyExtractor={item => item.ID.toString()}
          /> 
        </SafeAreaView>  
        <Button
          title="Bölge Seçimine Geri Dön"
          onPress={() => this.props.navigation.navigate('Bolge')}
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
      backgroundColor: '#6ebb83',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
 export default AnketPage;