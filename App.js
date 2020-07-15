
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView, Button,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  ViewBase,
  Image,
  FlatList,
  TouchableHighlight
} from 'react-native';

const Separator = () => (
  <View style={styles.lineStyle} />
);

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  lineStyle:{
    borderWidth: 0.5,
    borderColor:'black',
    margin:10,
    width: 165
  },

  button:{
    width:165
  },

  buttonH: {
    alignItems: "center",
    backgroundColor: "#4d94ff",
    padding: 10
  },

bodyContent:{
  width:165
},
name:{
  width:165
},
countText: {
  color: "#ffffff"
}

});

function HomeScreen({ navigation }) {
  return (
       <View style={styles.container}>
        <View style={{ width: 200}}>
          {/* <Button
              style={styles.button}
              title="Listar Superheroes"
              onPress={() => navigation.navigate('Voladores?')}
            /> */}
          <TouchableHighlight onPress={() => navigation.navigate('Voladores?')}>
            <View style={styles.buttonH}>
              <Text style={styles.countText}>LISTAR SUPERHEROES</Text>
            </View>
          </TouchableHighlight>
        </View>
        <Separator />
        <View style={{ width: 200}}>
          {/* <Button
              style={styles.button}
              title="Buscar Superheroe"
              onPress={() => navigation.navigate('Buscando?')}
            /> */}
          <TouchableHighlight onPress={() => navigation.navigate('Buscando?')}>
            <View style={styles.buttonH}>
              <Text style={styles.countText}>BUSCAR SUPERHEROES</Text>
            </View>
          </TouchableHighlight>
        </View>
        
        
      </View>
  );
}

function VueloScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ width: 200}}>
        <Button
            color="#d35400"
            style={styles.button2}
            title="Ver los q Vuelan"
            onPress={() => navigation.navigate('Perfiles_Voladores')}
          />
      </View>
      <Separator />
      <View style={{ width: 200}}>
        <Button
            color="#d35400"
            style={styles.button2}
            title="Ver los q no Vuelan"
            onPress={() => navigation.navigate('Perfiles_No_Voladores')}
          />
      </View>
    </View>
  );
}

function BuscarScreen({ navigation }) {
  
  
  const [textInputValue, setTextInputValue] = React.useState('');
  return (
    <View style={styles.container}>
      <View style={{ width: 200}}>
      <TextInput

      textAlign={'center'}
      style={{ 
    	height: 40, 
    	borderColor: 'gray', 
    	borderWidth: 1,
    	// placeholderTextColor: 'gray',
      }}
      onChangeText={text => setTextInputValue(text)}
      value={textInputValue}
	    placeholder="Ingresa el ID del Superheroe!"
    />
      </View>
      <Separator />
      <View style={{ width: 200}}>
        <Button
            color="#139111"
            style={styles.button2}
            title="Buscar Ahora"
            onPress={() => navigation.navigate('Perfil',{
              ID:{textInputValue}
            })}
          />
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

function LogoTitle() {
    return (
      <Image
        source={require('./agilesoft_logo.png')}
        style={{ width: 180, height: 50 }}
      />
    );
  }
  
class BuscarHeroe extends Component {
  constructor(props) {
    super(props);
    console.log(props.route.params.ID.textInputValue);
    const idHeroe=props.route.params.ID.textInputValue;
    console.log(idHeroe);
    this.state = {
      idHeroe:idHeroe,
      heroe:null,
      loading: true,
      message:false
    }
  }
    
  
  // +props.route.params.ID.textInputValue
  async componentDidMount() {
        fetch('http://157.245.138.232:9091/api/v1/test/superheroes/'+this.state.idHeroe)
        .then( res=> res.json())
        .then(json=> this.setState({heroe: json.data, loading: false}))
        .catch(() => {
          this.setState({message: true})
          console.log(this.state.message);
          console.log('error in fetching heroe');
        });

}

  render() {
      const { heroe, loading, message } = this.state;
      if(!loading) {
        if(heroe){
          return (            
            <View  style={styles.container}>
              <View style={{ flexDirection: 'row', width:200}}>      
                <Image 
                  style={{width: 80, height: 80,borderRadius: 400/ 2}}
                  source={{ uri: heroe.avatarURL}}/>

                <View style={{ width: 280, height: 80, justifyContent:'center', marginLeft:25}}>
                    <Text style={{fontSize:18, color: 'black', marginBottom:15,fontWeight: 'bold'}}>
                      { heroe.nombre}
                    </Text>
                    <Text style={{fontSize: 12, color: 'black'}}>
                      {heroe.nombreReal}
                    </Text>
                </View>
              </View>
            </View>
          ) 
        }else{
          return (            
            <View  style={styles.container}>

                    <Text style={{fontSize:18, color: 'black', marginBottom:15,fontWeight: 'bold'}}>
                    Aun no nace el Heroe con ese ID
                    </Text>
                
                </View>
          ) 
    
    // <View style={styles.container}><Text>Aun no nace el Heroe con ese ID</Text></View>
        }
      } else {
          return <ActivityIndicator />
      }
      // return <ActivityIndicator />
  }
}
  
class PerfilVoladoresScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
      dataSource:[],
      isloading:true
    }
  }
  renderItem=({item})=>{
    return(
      <View style={{ flexDirection: 'row', width:340,margin:15}}>      
        <Image 
          style={{width: 80, height: 80,borderRadius: 400/ 2}}
          source={{ uri: item.avatarURL}}/>

        <View style={{ width: 280, height: 80, justifyContent:'center', marginLeft:25}}>
            <Text style={{fontSize:18, color: 'black', marginBottom:15,fontWeight: 'bold'}}>
              {item.nombre}
            </Text>
            <Text style={{fontSize: 12, color: 'black'}}>
              {item.nombreReal}
            </Text>
        </View>
      </View>
    )
  }

  renderSeparator=()=>{
    return(
        <View
            style={{height:1, width:'100%', backgroundColor:'black'}}>
        </View>
    )
  }
  
  // +props.route.params.ID.textInputValue
  async componentDidMount() {
        fetch('http://157.245.138.232:9091/api/v1/test/superheroes?puedeVolar=true')
        .then( res=> res.json())
        .then((responseJson)=>{
          this.setState({
              dataSource:responseJson.data,
              isLoading:false
          })
            console.log(this.state.dataSource);
        })
        .catch(() => {
          this.setState({message: true})
          console.log(this.state.message);
          console.log('error in fetching heroe');
        });
  }

  render(){
    return(
      this.state.isLoading
      ?
      <View style={{flex:1,justufyContent:'center', alignItems:'center'}}>
          {/* <ActivityIndicator size='large' color='#330066' animating /> */}
          <Text>cargando</Text>
      </View>
      :
      <View style={styles.container}>
          <FlatList
              data={this.state.dataSource}
              renderItem={this.renderItem}
              keyExtractor={(item, index) =>index.toString()}
              ItemSeparatorComponent={this.renderSeparator}
          />
      </View>
    )
  }
}
  
class PerfilNoVoladoresScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
      dataSource:[],
      isloading:true
    }
  }
  renderItem=({item})=>{
    return(
      <View style={{ flexDirection: 'row', width:340,margin:15}}>      
        <Image 
          style={{width: 80, height: 80,borderRadius: 400/ 2}}
          source={{ uri: item.avatarURL}}/>

        <View style={{ width: 280, height: 80, justifyContent:'center', marginLeft:25}}>
            <Text style={{fontSize:18, color: 'black', marginBottom:15,fontWeight: 'bold'}}>
              {item.nombre}
            </Text>
            <Text style={{fontSize: 12, color: 'black'}}>
              {item.nombreReal}
            </Text>
        </View>
      </View>
    )
  }

  renderSeparator=()=>{
    return(
        <View
            style={{height:1, width:'100%', backgroundColor:'black'}}>
        </View>
    )
  }
  
  // +props.route.params.ID.textInputValue
  async componentDidMount() {
        fetch('http://157.245.138.232:9091/api/v1/test/superheroes?puedeVolar=false')
        .then( res=> res.json())
        .then((responseJson)=>{
          this.setState({
              dataSource:responseJson.data,
              isLoading:false
          })
            console.log(this.state.dataSource);
        })
        .catch(() => {
          this.setState({message: true})
          console.log(this.state.message);
          console.log('error in fetching heroe');
        });
  }


  render(){
    return(
      this.state.isLoading
      ?
      <View style={{flex:1,justufyContent:'center', alignItems:'center'}}>
          {/* <ActivityIndicator size='large' color='#330066' animating /> */}
          <Text>cargando</Text>
      </View>
      :
      <View style={styles.container}>
          <FlatList
              data={this.state.dataSource}
              renderItem={this.renderItem}
              keyExtractor={(item, index) =>index.toString()}
              ItemSeparatorComponent={this.renderSeparator}
          />
      </View>
    )
  }
}
  
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}  options={{ headerTitle: props => <LogoTitle {...props} /> }} />
        <Stack.Screen name="Voladores?" component={VueloScreen} />
        <Stack.Screen name="Buscando?" component={BuscarScreen} />
        <Stack.Screen name="Perfiles_Voladores" component={PerfilVoladoresScreen} />
        <Stack.Screen name="Perfiles_No_Voladores" component={PerfilNoVoladoresScreen} />
        <Stack.Screen name="Perfil" component={BuscarHeroe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;




