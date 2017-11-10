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
            headerStyle: { backgroundColor: '#00E676' },
            headerTitleStyle: { color: '#392A62' },
            headerRight: (<Icon name='md-log-out' onPress={params.handleLogout} style={{ marginRight: 10, color: '#392A62' }} />) // custom component
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
        if (!prop.login) {
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
                    />

                    <Button onPress={this.circle} style={{ backgroundColor: '#00E676', width: 100, height: 35, marginLeft: 40 }}
                    >
                        <Text style={{ marginLeft: 10, color: '#392A62' }} >Create Circle</Text>
                    </Button>
                    <TextInput
                        style={{ width: 200, height: 40, color: '#392A62' }}
                        placeholder="Circle key"
                        placeholderTextColor="#392A62"
                        onChangeText={(text) => this.setState({ key: text })}
                        underlineColorAndroid='#392A62'
                    />
                    <Button
                        onPress={this.joinCircle}
                        style={{ backgroundColor: '#00E676', width: 100, height: 35, marginLeft: 40, marginTop: 10 }}>
                        <Text style={{ marginLeft: 15, color: '#392A62' }} >Join Circle</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "grey",
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(createCircle)