import React, { Component } from 'react';
// import Button from '../../Tags/Button';
// import Header from '../../Tags/Header';
// import Input from '../../Tags/Input';
import { connect } from 'react-redux';
import Middleware from '../../Store/Middleware/Middleware';
import { Container, Content, Card, CardItem, Input, Footer, Icon } from 'native-base';
import { View, Text, AsyncStorage, Button, Image, StyleSheet, TextInput } from "react-native";
import * as firebase from "firebase";



function mapDispatchToProps(dispatch) {
    return {
        createCircle: (user) => {
            dispatch(Middleware.createCircle(user))
        },
        logout: () => {
            dispatch(Middleware.signoutUser())
        },
        joinGroup: (key) => {
            dispatch(Middleware.joinGroup(key))
        }

    }
}
function mapStateToProps(state) {
    return {

        UserDetails: state.Reducers.CrtCrcle,
        signout: state.Reducers.logout,
        login: state.Reducers.Login

    }
}

class createCircle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            key: ''
            // users: []
        }
    }



    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Create Circle',
            //left: (<Text style={{color: "#fff"}} />),
            headerBackTitleStyle: { color: '#fff' },
            //headerLeftButtonStyle: {color:'#fff'},
            headerStyle: { backgroundColor: 'rgb(0,150,136)' },
            headerTitleStyle: { color: '#fff' },
            headerRight: (<Icon name='md-log-out' onPress={params.handleLogout} style={{ marginRight: 10, color: '#fff' }} />) // custom component
        }
    }
    _signout = () => {
        this.props.logout()
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleLogout: this._signout });
    }

    componentWillMount() {
        console.disableYellowBox = true;
    }
    circle = () => {
        circleName = {
            name: this.state.name
        }
        console.log(circleName)
        this.props.createCircle(circleName)
        this.props.navigation.navigate('AllCircle')
    }
    componentWillReceiveProps(prop) {
        console.log("next props", prop)
        if (prop.signout) {
            prop.navigation.navigate("login")
        }
    }
    joinCircle = () => {
        const key = this.state.key

        this.props.joinGroup(key)
        this.setState({ key: '' })
        this.props.navigation.navigate('AllCircle')

    }

    render() {
        return (
            // <Container style={styles.container}>
            <View style={styles.container}>
                <TextInput
                    style={{ width: 200, height: 40, color: '#fff' }}
                    placeholder="Circle Name"
                    placeholderTextColor="#fff"
                    onChangeText={(name) => this.setState({ name })}
                    underlineColorAndroid='#fff'
                />

                <Button onPress={this.circle}
                    title='Create Circle'
                    color='rgb(0,150,136)'
                    style={{ width: 100, height: 35 }}
                />

                <TextInput
                    style={{ width: 200, height: 40, color: '#fff' }}
                    placeholder="Circle key"
                    placeholderTextColor="#fff"
                    onChangeText={(text) => this.setState({ key: text })}
                    underlineColorAndroid='#fff'
                />
                <Button
                    onPress={this.joinCircle}
                    title='Join Circle'
                    color='rgb(0,150,136)'
                    style={{ width: 100, height: 35, marginTop: 10 }} />
            </View>
            // </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(createCircle)
const styles = StyleSheet.create({
    container: {
        backgroundColor: "grey",
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // content: {
    //     flex: 1,
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    back: {
        backgroundColor: '#fff',
        color: '#fff',
        //fontFamily: "Lato-Regular",
    }
})