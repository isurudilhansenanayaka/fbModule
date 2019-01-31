import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

export default class MyButton extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return( 
            <Button 
            onPress={this.props.onPress} 
            containerStyle={{ marginTop: 20, padding:20, }} 
            buttonStyle={styles.btns} 
            title={this.props.title}>
            </Button>
        );
    }

}
const styles = StyleSheet.create({
    btns: {
        width: '40%',
        height: 25,
        borderWidth: 0,
        borderRadius: 15,
        backgroundColor: '#E03616',
        color:'#FFF689',
    },

});