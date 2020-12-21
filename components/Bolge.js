import React , { Component } from 'react';
import { Button, View,Text ,TouchableOpacity} from 'react-native'; 
import { SafeAreaView, FlatList, StyleSheet, StatusBar,Animated } from 'react-native';
let newData=[];
 
class Bolge extends Component {  
    constructor(props) {
        super(props);
        this.Bolges=this.Bolges.bind(this);
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
        this.Bolges();
    }
    
render(){
    const renderItem = ({ item }) => (
      
      <Item title={item} /> 
    );
    
  const Item = ({ title }) => (
    
    <View style={styles.item}>
      <TouchableOpacity onPress={() => { 
         let data=title.ID
        this.props.navigation.navigate('AnketSinavPage',{data:data} );
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
          onPress={() =>  this.props.navigation.navigate('Notifications')}
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
  
export default Bolge;