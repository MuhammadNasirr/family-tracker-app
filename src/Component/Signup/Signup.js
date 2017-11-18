import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Icon, Footer } from 'native-base';
import { View, Text, AsyncStorage, Image, Button, StyleSheet, TextInput } from "react-native"
// import Button from '../../Tags/Button';
// import Header from '../../Tags/Header';
// import Inputrr from '../../Tags/Input';
// import Spinner from '../../Tags/Spinner';
import { connect } from 'react-redux';
import Middleware from '../../Store/Middleware/Middleware';


function mapDispatchToProps(dispatch) {
    return {
        signupUser: (users) => dispatch(Middleware.signupUser(users))

    }
}
function mapStateToProps(state) {
    return {

        signup: state.Reducers.Signup,
    }
}


class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullname: '',
            surname: '',
            email: '',
            password: '',
            usersAllData: [],
            user: [],
        }
    }
    static navigationOptions = {
        title: "Create an account",
        headerStyle: { backgroundColor: '#2C3745' },
        headerTitleStyle: { color: '#fff' },

    }
    componentWillReceiveProps(props) {
        if (props.signup) {
            this.setState({ usersAllData: props.signup })
        }
        console.log("props", props.signup)
    }
    componentWillMount() {
        console.disableYellowBox = true
    }

    SignupUser = (e) => {
        var userDetails = {
            fullname: this.state.fullname,
            surname: this.state.surname,
            email: this.state.email,
            pass: this.state.password,
        }
        this.props.signupUser(userDetails)
        this.props.navigation.navigate('login')
    }

    render() {
        return (
            <Image source={require('../../Images/2.jpg')} style={styles.bgImage}>
                <View style={styles.container}>
                    <TextInput
                        style={{ height: 40, width: 200, color: '#fff' }}
                        placeholder="Full Name"
                        placeholderTextColor="white"
                        onChangeText={(fullname) => this.setState({ fullname })}
                        underlineColorAndroid='#fff'

                    />
                    <TextInput
                        style={{ height: 40, width: 200, color: '#fff' }}
                        placeholder="Surname"
                        placeholderTextColor="white"
                        onChangeText={(surname) => this.setState({ surname })}
                        underlineColorAndroid='#fff'

                    />
                    <TextInput
                        style={{ height: 40, width: 200, color: '#fff' }}
                        placeholder="Email Address.."
                        placeholderTextColor="white"
                        onChangeText={(email) => this.setState({ email })}
                        underlineColorAndroid='#fff'

                    />
                    <TextInput
                        style={{ height: 40, width: 200, color: '#fff' }}
                        placeholder="Password"
                        placeholderTextColor="white"
                        onChangeText={(password) => this.setState({ password })}
                        underlineColorAndroid='#fff'
                        secureTextEntry={true}
                    />
                    <Button block rounded
                        title="Sign Up"
                        color="#2C3745"
                        style={{ padding: 10, width: 240 }} onPress={this.SignupUser} />
                    {
                        (this.props.Signup) ?
                            this.props.Signup.map((user, i) => {
                                console.log(user.fullname)
                                return (<View key={i}>
                                    <Text style={{ color: '#fff' }}>{user.fullname}</Text>
                                    {/* {keys.users.map((p, i) => {
                                    return (
                                        <View key={i + 1}>
                                            <Text >{p.fname}</Text>
                                            <Text >{p.email}</Text>
                                        </View>
                                    )
                                })} */}
                                </View>
                                )
                            })
                            : null
                    }
                    <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center', marginTop: 10 }}> Forgot your login details?<Text style={{ fontWeight: 'bold', }}> Get login help.</Text> </Text>
                </View>
                <Footer style={{ justifyContent: 'center', height: 40 }}>
                    <Button bordered
                        title="Already have an account"
                        color="#2C3745"
                        style={{ padding: 10, width: 240 }} onPress={() => { this.props.navigation.navigate('login') }} />
                </Footer>
            </Image>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

    }
})