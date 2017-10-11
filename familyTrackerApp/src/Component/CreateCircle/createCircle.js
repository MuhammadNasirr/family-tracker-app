import React, { Component } from 'react';
// import Button from '../../Tags/Button';
// import Header from '../../Tags/Header';
// import Input from '../../Tags/Input';
import { connect } from 'react-redux';
import Middleware from '../../Store/Middleware/Middleware';
import { Container, Button, Content, Card, CardItem, Input, Footer, Icon } from 'native-base';
import { View, Text, AsyncStorage, Image, StyleSheet, TextInput } from "react-native";
import * as firebase from "firebase";



function mapDispatchToProps(dispatch) {
    return {
        createCircle: (user) => {
            dispatch(Middleware.createCircle(user))
        },
    }
}
function mapStateToProps(state) {
    return {

        UserDetails: state.Patients.CrtCrcle
    }
}

class createCircle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            // users: []
        }
    }

    _onNavigate = () => {
        this.props.navigation.navigate('MapView');
    }
    static navigationOptions = {
        title: 'Create Circle',
        headerStyle: { backgroundColor: '#00E676' },
        headerTitleStyle: { color: '#392A62' },
        headerLeft: <Icon name='ios-arrow-back' onPress={(_onNavigate) => { this._onNavigate() }} style={{ marginLeft: 10, color: '#392A62' }} />,
        headerRight: <Icon name='md-person-add' style={{ marginRight: 10, color: '#392A62' }} />,
    }

    componentWillMount() {
    console.disableYellowBox = true;
    // AsyncStorage.getItem('Patient App', (err, result) => {
    //     if (result !== null) {
    //         let data = JSON.parse(result)
    //         var email = data.email
    //         var pass = data.pass
    //         firebase.auth().signInWithEmailAndPassword(email, pass)
    //             .then((user) => {
    //                 this.props.navigation.navigate('tabnavigation')
    //             })
    //     }
    // })
    }

    // LoginUser = () => {
    //     if (this.state.email == '' || this.state.pass == '') {
    //         alert('Enter Email and Password !')
    //     }
    //     else {

    //         var email = this.state.email;
    //         var pass = this.state.pass;

    //         var doctor = {
    //             email: email,
    //             pass: pass,
    //         }
    //         this.props.loginUser(this.props, doctor)
    //     }
    // }
    circle = () => {
        circleName = {
            name: this.state.name
        }
        console.log(circleName )
        this.props.createCircle(circleName)
        this.props.navigation.navigate('ShowAllCircle')
    }

    render() {
        return (
            // <Image source={require('../../Images/1.png')} style={styles.bgImage}>
            <Container style={styles.container}>
                <Content style={{
                    width: 240,
                    marginTop: 200,
                    marginLeft: 40
                }} >
                    <TextInput
                        style={{ width: 200, height: 40, color: '#392A62' }}
                        placeholder="Circle Name"
                        placeholderTextColor="#392A62"
                        onChangeText={(name) => this.setState({ name })}
                        underlineColorAndroid='#392A62'
                        //secureTextEntry={true}
                    />

                    <Button onPress={this.circle} style={{ backgroundColor: '#00E676', width: 100, height: 35, marginLeft: 40 }}
                    // onPress={this.LoginUser}
                    >
                        <Text style={{ marginLeft: 10, color: '#392A62' }} >Create Circle</Text>
                    </Button>
                </Content>
            </Container>
            // </Image>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(createCircle)

const styles = StyleSheet.create({
    container: {
        backgroundColor: "grey",
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
})