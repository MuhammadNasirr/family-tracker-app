//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, TextInput, ScrollView, TouchableHighlight, AsyncStorage, Footer } from 'react-native';
import { Container, Header, Right, Left, Body, Content, Icon, List, Button, ListItem, Thumbnail, Item, Input, Label, Spinner } from 'native-base';
import { connect } from 'react-redux';
import EIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome';
import Middleware from '../../Store/Middleware/Middleware';
import * as firebase from 'firebase';

function mapStateToProps(state) {
    return {
        allCircle: state.Reducers.showGroupsData,
        showGroups: state.Reducers.showGroups,
        signout: state.Reducers.logout,
        login: state.Reducers.Login
    }
}
function mapDispatchToProps(dispatch) {
    return {
        groups: () => {
            dispatch(Middleware.showGroups())
        },
        logout: () => {
            dispatch(Middleware.signoutUser())
        }

    }
}


class ShowAllCircle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            loading: false,
        }
    }
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'All Circle',
            headerStyle: { backgroundColor: '#00E676' },
            headerTitleStyle: { color: '#392A62' },
            headerRight: (<Icon name='md-log-out' onPress={params.handleLogout} style={{ marginRight: 10, color: '#392A62' }} />) // custom component
        }
    }
    componentWillMount() {
        console.disableYellowBox = true
        this.props.groups()
        this.setState({ loading: true })

    }
    _signout = () => {
        this.props.logout()
    }
    componentDidMount() {
        this.props.navigation.setParams({ handleLogout: this._signout });
    }
    componentWillReceiveProps(prop) {
console.log("next props", prop)
        if (prop.error) {
            this.setState({ loading: false })
        }


        if (prop.allCircle[0] !== undefined) {
            this.setState({ loading: false })

            this.state.groups = prop.allCircle
        }
        if (!prop.login) {
            prop.navigation.navigate("login")
        }


    }
    renderGroups() {
        if (this.state.loading) {
            return <Spinner color="#00E676" />
        }

        return (
            <Content>

                {
                    this.state.groups.map((obj, ind) => {
                        return (
                            console.log(obj),

                            <ListItem onPress={() => { this.props.navigation.navigate("CircleDetails", { joinKey: obj.JoiningCode, userDetail: obj }) }} key={ind} style={{ marginLeft: 10, marginRight: 10, marginTop: 5 }}>
                                {/* <Thumbnail square size={80} source={{ uri: place.icon }} /> */}
                                <Body style={{ marginLeft: 10, }}>
                                    <Text> {obj.circleName}</Text>
                                </Body>
                            </ListItem>

                        )
                    })
                }

            </Content>
        )
    }
    render() {

        console.log(this.state.loading, "groups")

        return (
            <Container>
                {this.renderGroups()}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowAllCircle);
