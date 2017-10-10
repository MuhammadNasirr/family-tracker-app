import React, { Component } from 'react'
import * as firebase from "firebase";
import { View, Text } from "react-native"
import Naviagte from "./nav"
import { Container, Header, Root } from 'native-base'
import store from './Store';
import { Provider } from 'react-redux';

var config = {
    apiKey: "AIzaSyAkIU1G8oxGVqyqyYDgQell4M1pS9ArCjg",
    authDomain: "simple-calculator-9d3e5.firebaseapp.com",
    databaseURL: "https://simple-calculator-9d3e5.firebaseio.com",
    projectId: "simple-calculator-9d3e5",
    storageBucket: "simple-calculator-9d3e5.appspot.com",
    messagingSenderId: "575649196718"
  };
firebase.initializeApp(config);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Root>
                    <Naviagte />
                </Root>
            </Provider>
        )
    }
}
export default App