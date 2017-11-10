import React, { Component } from 'react';
import { connect } from 'react-redux';
import Middleware from '../../Store/Middleware/Middleware';
import { Container, Button, Content, Card, CardItem, Input, Footer } from 'native-base';
import { View, Text, AsyncStorage, Image, StyleSheet, TextInput } from "react-native";
import * as firebase from "firebase";



function mapDispatchToProps(dispatch) {
    return {
        loginUser: (user) => {
            dispatch(Middleware.loginUser(user))
        },
    }
}
function mapStateToProps(state) {
    return {
        login: state.Reducers.Login
    }
}



class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            pass: '',
            users: []
        }
    }
    static navigationOptions = {
        title: 'Login Page',
        header: null,
    }

    // componentWillMount() {
    //     console.disableYellowBox = true;
    //     AsyncStorage.getItem('xyz', (err, result) => {
    //         if (result !== null) {
    //             let data = JSON.parse(result)
    //             var email = data.email
    //             var pass = data.pass
    //             firebase.auth().signInWithEmailAndPassword(email, pass)
    //                 .then((user) => {

    //                     this.props.navigation.navigate('MapView')
    //                 })
    //         }
    //     })
    // }
    componentWillReceiveProps(prop) {
        console.log(prop, "next prop")
        if (prop.login) {
            prop.navigation.navigate("MapView")
            // alert("asdasdasdasd")
        }
    }

    LoginUser = () => {
        if (this.state.email == '' || this.state.pass == '') {
            alert('Enter Email and Password !')
        }
        else {

            var email = this.state.email;
            var pass = this.state.pass;

            var user = {
                email: email,
                pass: pass,
            }
            this.props.loginUser(user)
           // this.props.navigation.navigate("MapView")
        }
    }

    render() {
        return (
            <Image source={require('../../Images/2.jpg')} style={styles.bgImage}>
                <Container style={styles.container}>
                    <Content style={{
                        width: 240,
                        marginTop: 200,
                        marginLeft: 40
                    }} >
                        <TextInput
                            style={{ width: 200, height: 40, color: '#fff' }}
                            placeholder="Email Address"
                            placeholderTextColor="white"
                            onChangeText={(email) => this.setState({ email })}
                            underlineColorAndroid='white'
                            required
                        />

                        <TextInput
                            style={{ width: 200, height: 40, color: '#fff' }}
                            placeholder="Password"
                            placeholderTextColor="white"
                            onChangeText={(pass) => this.setState({ pass })}
                            underlineColorAndroid='white'
                            secureTextEntry={true}
                        />

                        <Button style={{ backgroundColor: '#2C3745', width: 70, height: 35, marginLeft: 60 }} onPress={this.LoginUser}>
                            <Text style={{ marginLeft: 15, color: 'white' }} >Login</Text>
                        </Button>

                        <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', marginTop: 10, marginRight: 50 }}> Forgot your login details?<Text style={{ fontWeight: 'bold', }}> Get login help.</Text> </Text>
                    </Content>
                    <Footer style={{ backgroundColor: '#2C3745', height: 40, marginBottom: 10 }}>
                        <Button bordered style={{ padding: 10, width: 240 }} onPress={() => { this.props.navigation.navigate('signup') }}>
                            <Text style={{ marginLeft: 50, marginBottom: 5, color: 'white', }} >Create an account </Text>
                        </Button>
                    </Footer>

                </Container>
            </Image>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
    container: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
        resizeMode: 'stretch',

    },
})