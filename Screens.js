function AnketSoruPage({ navigation }) {   
    const renderItem = ({ item }) => (
      
      <Item title={item} /> 
    );
    
  const Item = ({ title }) => (
    
    <View style={styles.item}>
      <TouchableOpacity onPress={() => {
           surveys.ID=title.ID; 
        navigation.navigate('Notifications');
    }}>
      <Text style={styles.title}>Anket Soru Page</Text>
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