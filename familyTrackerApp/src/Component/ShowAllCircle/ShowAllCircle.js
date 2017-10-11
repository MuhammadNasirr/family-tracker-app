//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, Button, TextInput, ScrollView, TouchableHighlight, AsyncStorage } from 'react-native';
import { Container, Header, Right, Left, Body, Content,Icon, List, ListItem, Item, Input, Label } from 'native-base';
import { connect } from 'react-redux';
import EIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome';
import Middleware from '../../Store/Middleware/Middleware';

// import fb from '../../firebase';
// import apiKey from '../../services/api';
// import getPlaceDirection from '../../services/getPlaceDirection';


function mapStateToProps(state) {
    return {
        // userLocation: state.Patients
    }
}
function mapDispatchToProps(dispatch) {
    return {
        // update: (newDetails, doctorId, callback) => dispatch(updateEntry(newDetails, doctorId, callback)),
        // delete: (entry, doctorId, callback) => dispatch(deleteEntry(entry, doctorId, callback)),
        // getDirections: (destinationloc) => dispatch(Middleware.getDirections(destinationloc))

    }
}

// create a component
// const endloclat = ''
// const endloclon = ''

class ShowAllCircle extends Component {
    constructor(props) {
        super(props);
        this.state = {

            // modalVisible: false
        }
    }
    static navigationOptions = {
        title: 'All Circle',
        headerStyle: { backgroundColor: '#00E676' },
        headerTitleStyle: { color: '#392A62' },
        headerLeft: <Icon name='ios-arrow-back' onPress={(_onNavigate) => { this._onNavigate() }} style={{ marginLeft: 10, color: '#392A62' }} />,
        headerRight: <Icon name='ios-person' style={{ marginRight: 10, color: '#392A62' }} />,
    }
   // componentWillMount() {
        // setTimeout(() => {
        //     console.log(endloclat, "asdasdasd")
        //     // this.props.getDirections(endloclat);

        // }, 5000)
        // console.log(endloclat, "asdasdasd")
        // this.props.getDirections(endloclat);
   // }

    // async componentDidMount() {
    //     await AsyncStorage.getItem('userLocation', (err, result) => {
    //         console.log(err, result);
    //         let coords = JSON.parse(result);
    //         let { latitude, longitude } = coords;
    //         if (result) {
    //             this.setState({ latitude, longitude });
    //         }
    //     })
    // }
    _navigations = () => {
        this.props.navigation.navigate('MapView');
    }
    render() {
        // let { navigate } = this.props.navigation;
        // console.log(this.props);

        // let place = this.props.navigation.state.params;

        // console.log(place + 'asdasd');
        // let { latitude, longitude } = this.state;
        // let { lat, lng } = place.geometry.location;
        // endloclat = { lat, lng }




        return (
            <Container>
                {/* <Header style={{ backgroundColor: '#1162ca' }}>
                    <StatusBar
                        backgroundColor="rgba(0,0,0,1)"
                    />
                    <Left>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('PlacesList') }}>
                            <View style={{ width: 40, }}>
                                <EIcon name="chevron-thin-left" style={{ color: '#fff', fontSize: 20 }} />
                            </View>
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={{ fontSize: 20, color: '#fff' }} >Place Details</Text>
                    </Body>
                </Header> */}

                <Content style={styles.container}>

                    {/* <ScrollView horizontal={true}>
                        {place.photos && place.photos.length !== 0 ?
                            place.photos.map((photo, i) => {
                                console.log('rendering Image', photo)
                                return (
                                    <ListItem style={{ marginLeft: 0, marginRight: 0 }}>
                                        <Body style={{ marginLeft: 10, }}>
                                            <Text style={{ fontSize: 15 }}>Name: </Text>
                                            <Text>{place.name}</Text>
                                        </Body>
                                    </ListItem >
                                )

                            })
                            : null
                        }
                    </ScrollView> */}
                    {/*<View style={{ flex: 1, marginBottom: 10 }}>


                        <ListItem style={{ marginLeft: 0, marginRight: 0 }}>
                            <Body style={{ marginLeft: 10, }}>
                                <Text style={{ fontSize: 15 }}>Name: </Text>
                                <Text>{place.name}</Text>
                            </Body>
                        </ListItem >
                        <ListItem style={{ marginLeft: 0, marginRight: 0 }}>
                            <Body style={{ marginLeft: 10, }}>
                                <Text style={{ fontSize: 18 }}>Rating: </Text>
                                <Text style={{ fontSize: 20 }}>{place.rating}</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ marginLeft: 0, marginRight: 0 }}>
                            <Body style={{ marginLeft: 10, }}>
                                <Text style={{ fontSize: 15 }}>Address: </Text>
                                <Text style={{ fontSize: 12 }}>{place.vicinity}</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ marginLeft: 0, marginRight: 0 }}>
                            <Body style={{ marginLeft: 10, }}>
                                <Text style={{ fontSize: 18 }}>Type: </Text>
                                <Text style={{ fontSize: 20 }}>{place.types[0]}</Text>
                            </Body>
                        </ListItem>*/}

                        {/* <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <Text style={{ fontSize: 15 }}>Name: </Text>
                                <Text style={{ fontSize: 18 }}>{place.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <Text style={{ fontSize: 18 }}>Rating: </Text>
                                <Text style={{ fontSize: 20 }}>{place.rating}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <Text style={{ fontSize: 15 }}>Address: </Text>
                                <Text style={{ fontSize: 12 }}>{place.vicinity}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <Text style={{ fontSize: 18 }}>Type: </Text>
                                <Text style={{ fontSize: 20 }}>{place.types[0]}</Text>
                            </View> */}
                    {/*</View>*/}
                    <View style={styles.button}>
                        <Button style={{ alignItems: 'center' }} title="Go To Map" onPress={() => { this._navigations() }} />
                    </View>


                </Content>
            </Container >
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

        marginTop: 0,
    },
    content: {


    },
    input: {
        marginBottom: 40
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    modal2: {
        height: 230,
        backgroundColor: "#3B5998"
    },

    modal3: {
        height: 300,
        width: 300
    },
    button: {
        marginLeft: 140,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
    }
});

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(ShowAllCircle);
