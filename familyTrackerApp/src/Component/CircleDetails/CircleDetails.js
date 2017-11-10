import React, { Component } from 'react';
import { connect } from 'react-redux';
import Middleware from '../../Store/Middleware/Middleware';
import { Container, Button, Content, Card, CardItem, Input, Footer, Icon, Spinner,ListItem,Body } from 'native-base';
import { View, Text, AsyncStorage, Image, StyleSheet, TextInput, Share } from "react-native";
import * as firebase from "firebase";



function mapDispatchToProps(dispatch) {
    return {
        getUserDetails: (detail) => {
            dispatch(Middleware.userDetail(detail))
        }
    }
}
function mapStateToProps(state) {
    return {

        userDetail: state.Reducers.getUserDetails,
        dataUserDetail: state.Reducers.userDetailData,
        login: state.Reducers.Login
    }
}

class CircleDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            joinCode: '',
            userDetail: [],
            newData: [],
            loading: false,
        }
    }



    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Circle Details',
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

        setTimeout(() => {
            this.props.getUserDetails(this.state.userDetail)
        }, 1000)
    }

    componentWillMount() {
        console.disableYellowBox = true;
        this.setState({
            joinCode: this.props.navigation.state.params.joinKey,
            userDetail: this.props.navigation.state.params.userDetail
        })        
    }

    componentWillReceiveProps(prop) {
        console.log("next props", prop.dataUserDetail)
        if (!prop.login) {
            prop.navigation.navigate("login")
        }
        if (prop.userDetail) {
            this.setState({ loading: false })
        }

        if (prop.dataUserDetail[0] !== undefined) {
            console.log(prop.dataUserDetail)
            this.setState({ newData: prop.dataUserDetail })


        }
    }

    inviteMore = () => {
        Share.share({
            message: "Hi there!! use this code to join our group.." + " " + this.state.joinCode
        })
            .then(() => {
                console.log("Friends invited")
            })
    }

    renderDetail = () => {
        if (this.state.loading) {
            return <Spinner />
        }
        return (
            <Content>
                {
                    this.state.newData.map((obj, ind) => {
                        console.log(this.state.newData)                        
                        console.log(obj.fullname, "ooooo")
                        return (
                            <ListItem 
                            onPress={() => { this.props.navigation.navigate("MapView", { latlong: obj.Location, userDetail: obj }) }} 
                            key={ind} style={{ marginLeft: 10, marginRight: 10, marginTop: 5 }}>
                            <Icon name='ios-person' style={{ marginLeft: 10, color: '#392A62' }} />
                            <Body style={{ marginLeft: 10, }}>
                                <Text>{obj.fullname}</Text>
                            </Body>
                        </ListItem>
                        )
                    })
                }

            </Content>
        )
    }

    render() {
        return (
            <Content>
                {
                   this.renderDetail()
                }
                <Button iconLeft style={styles.Button} onPress={this.inviteMore}>
            <Icon style={{ marginLeft: 10, color:'#392A62' }} name='md-person-add' />
            <Text style={{ color: '#392A62', fontSize: 18, marginRight: 15, marginBottom: 3 }}>Invite More</Text>
          </Button>
            </Content>
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
    Button: {
        flex: 3,
        backgroundColor: '#00E676',
        marginLeft: 100,
        // marginBottom: 20,
        marginTop: 150,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
    
        height: 50,
        width: 150,
      }
})
export default connect(mapStateToProps, mapDispatchToProps)(CircleDetails)