import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';

import  TextBox  from '../components/TextBox';
import  MyButton  from '../components/MyButton';
import firebase from 'firebase';

export default class RegisterPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {name:'', contact:'', email:'', password:''};
        this.register = this.register.bind(this);
    }

    componentDidMount(){
        // Initialize Firebase
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
        
    }


    render(){
        return(
            <ScrollView>
                <Image style={{width:'100%', height: 100}} 
                source={require('../assets/logo.png')}/>
                <Text>Registration Page</Text>
                <TextBox onChangeText={(text) => this.setState({name: text})} label="Name" name="name" value={this.state.name} hint="John Zena"/>
                <TextBox onChangeText={(text) => this.setState({contact: text})} label="Contact" name="contact" value={this.state.contact} hint="0712345678"/>
                <TextBox onChangeText={(text) => this.setState({email: text})} label="Email" name="email"  value={this.state.email} hint="john@example.com"/>
                <TextBox onChangeText={(text) => this.setState({password: text})}label="Password" name="password" value={this.state.password} hint="Password"/>
                <MyButton onPress={this.login} title="LOGIN"/>
                <MyButton onPress={this.register} title="REGISTER"/>
            </ScrollView>
        );
    }

    login(){
        
    }

    register(){
        let name = this.state.name;
		let email = this.state.email;
		let contact = this.state.contact;
        let password = this.state.password;

        const { navigate } = this.props.navigation;
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(function(data) {
            data.user.updateProfile({
                displayName: name,
                phoneNumber: contact
            }).then(
                function(){
                    console.log("Updated User Data..");
                },
                function(error){
                    console.log("Error Updating User Data.."+error);
                }
            );

            firebase.database().ref('member/' + data.user.uid).set({
                name: name,
                email: email,
                contact: contact,
              });
            alert("Success!");
            navigate('Login');
        }).catch(function(error) {
			var errorMessage = error.message;
            console.log("Error = "+errorMessage);
            alert(errorMessage);
		});
    }
}