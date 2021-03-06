import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';

const AppStackNavigator = createStackNavigator(
    {
        Home: HomePage,
        Login: LoginPage,
        Register: RegisterPage
    },
    {
        initialRouteName: 'Login',
    }
);

export default createAppContainer(AppStackNavigator);