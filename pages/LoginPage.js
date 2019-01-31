import React from 'react';
import { Text, View, Image } from 'react-native';
import  TextBox  from '../components/TextBox';
import  MyButton  from '../components/MyButton';
import firebase from 'firebase';

export default class LoginPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {email:'' ,password:''};
        this.login = this.login.bind(this);
        
    }
    componentWillMount(){
        var config = {
            apiKey: "AIzaSyBYlz7DMHdl8MCpesEIGbBpAMcmUJ_Rzzs",
            authDomain: "fb-app-nadun.firebaseapp.com",
            databaseURL: "https://fb-app-nadun.firebaseio.com",
            projectId: "fb-app-nadun",
            storageBucket: "fb-app-nadun.appspot.com",
            messagingSenderId: "528291227443"
        };
        if(!firebase.apps.length){
            firebase.initializeApp(config);
        }
        const { navigate } = this.props.navigation;

        firebase.auth().onAuthStateChanged((user)=>{
            console.log("LOGIN1="+JSON.stringify(user));
            if(user){
                navigate('Home');
            }
        });
        
    } 
 
    render(){
        
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Image style={{width:'100%', height: 100}} 
                source={require('../assets/logo.png')}/>
                <Text>Login Page</Text>
                <TextBox onChangeText={(text) => this.setState({email: text})}  label="Email" name="email" value={this.state.email} hint="john@example.com"/>
                <TextBox onChangeText={(text) => this.setState({password: text})}  label="Password" name="password" value={this.state.password} hint="Password"/>
                <MyButton onPress={this.login} title="LOGIN"/>
                <View style={{height:25}}></View>
                <Text>No I Dont Have an Account.</Text>
                <MyButton onPress={() => navigate('Register')} title="REGISTER"/>
            </View>
        );
    }

    login(){
        let email = this.state.email;
        let password = this.state.password;

        let { navigate }  = this.props.navigation;

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(data){
		    navigate('Home', { uid: data.user.uid });
	    }).catch(function(error) { 
            var errorMessage = error.message;
            alert(errorMessage.toString());
        });
    }
    
}