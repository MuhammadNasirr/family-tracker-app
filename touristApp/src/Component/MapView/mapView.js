import React, { Component } from 'react'
import { Text, View, ListView, ScrollView, Button, StyleSheet, TouchableOpacity } from 'react-native'
import MapView from "react-native-maps"
import { Container, Drawer, Header, Content, Card, Fab, CardItem, List, ListItem, Thumbnail, Left, Body, Right, Icon, Title, Input, Footer } from 'native-base';
import { connect } from 'react-redux';
import Middleware from '../../Store/Middleware/Middleware';
import SideBar from '../SideBar/SideBar';
import AppHeader from '../AppHeader/AppHeader';
import NavigationBar from 'react-native-navbar';


function mapDispatchToProps(dispatch) {
    return {
        createCircle: (latitude, longitude) => {
            dispatch(Middleware.createCircle(latitude, longitude))
        },
        // placesDetails: (placeid, callback) => {
        //     dispatch(Middleware.placesDetails(placeid, callback))
        // },
    }
}
function mapStateToProps(state) {
    return {

        // NearbyPlaces: state.Patients.NearbyPlaces
    }
}

class mapView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: 'true',
            // toggled: false,
            region: {
                latitude: 24.871641,
                longitude: 67.059906,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            },

        }
    }
    static navigationOptions = {
        title: "Family Tracker System",
        headerStyle: { backgroundColor: '#00E676' },
        headerTitleStyle: { color: '#392A62' },
        // headerRight: <Button title="Info" />,
        headerLeft:  <Icon name='home' style={{ marginLeft: 10, color: '#392A62' }} />,


    }



    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position.results + 'asd')
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        altitude: 15.0444,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }
                });
            },
            (error) => {
                console.log(error)
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }



    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }


    onMapPress(e) {
        this.setState({
            marker: [
                {
                    coordinate: e.nativeEvent.coordinate

                },
            ],
        });
    }


    onRegionChange = (region) => {
        this.setState({ region: region })
    }
    _onNavigate = () => {
        this.props.navigation.navigate('CreateCircle');
    }
    render() {
        return (
            <View
                style={styles.container}>


                {/*<Drawer
                        ref={(ref) => { this.drawer = ref; }}
                        content={<SideBar navigator={this.navigator} />}
                        openDrawer={this.openDrawer.bind(this)}
                        onClose={() => this.closeDrawer()} >
                        <AppHeader
                        />
                    </Drawer>*/}

                {/*<ScrollView >*/}

                <View style={styles.view1}>
                    <MapView
                        provider="google"
                        style={styles.map}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        showsCompass={false}
                        showsPointOfInternet={false}
                        region={this.state.region}
                        onRegionChange={this.onRegionChange}
                        mapType="standard"
                        onPress={this.onMapPress.bind(this)}
                        zoomEnabled={true}
                        pitchEnabled={true}
                        showsBuildings={true}
                        showsTraffic={true}
                        showsIndoors={true}>
                    </MapView>
                </View>
                {/*<View style={styles.view2}>
                        {
                            (this.props.NearbyPlaces) ?
                                this.props.NearbyPlaces.map((place, i) => {
                                    console.log(place.name)
                                    return (
                                        <ListItem onPress={() => { this._onPressButton(place) }} key={i} style={{ marginLeft: 10, marginRight: 10 }}>
                                            <Thumbnail square size={80} source={{ uri: place.icon }} />
                                            <Body style={{ marginLeft: 10, }}>
                                                <Text>{place.name}</Text>
                                            </Body>
                                        </ListItem>
                                    )
                                })
                                : null
                        }
                    </View>*/}

                <View style={{ flex: 1 }}>
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: '#00E676' }}
                        position="bottomRight"
                        onPress={() => { this._onNavigate() }}>
                        <Icon name="md-person-add" style={{color:'#392A62'}} />
                        {/* <Button style={{ backgroundColor: '#34A34F' }}>
                            <Icon name="logo-whatsapp" />
                        </Button>
                        <Button style={{ backgroundColor: '#3B5998' }}>
                            <Icon name="logo-facebook" />
                        </Button>
                        <Button disabled style={{ backgroundColor: '#DD5144' }}>
                            <Icon name="mail" />
                        </Button> */}
                    </Fab>
                </View>
                {/*</ScrollView>*/}
                {/* <View style={{ flex: 1 }}>
                    <Fab direction="left" position="topRight" /> */}
                {/* <Fab
                        active={this.state.active}
                       // direction="up"
                        //containerStyle={{}}
                        style={{ backgroundColor: '#00E676' }}
                        position="bottomRight"
                        onPress={() => { this._onNavigate() }} >
                    </Fab> */}
                {/* <Button rounded style={{
                        height: 40,
                        width: 100, alignItems: 'center'
                    }} title="Add Circle" onPress={() => { this._onNavigate() }} /> */}
                {/* </View> */}
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(mapView)

const styles =
    {

        container: {
            // position: 'absolute',
            flexDirection: "column",
            // top: 0,
            // left: 0,
            // right: 0,
            // bottom: 0,
            ...StyleSheet.absoluteFillObject,

            flex: 1,
            justifyContent: 'flex-end',
            // alignItems: 'center',
        },
        // contentContainer: {
        //     paddingVertical: 2
        // },
        map: {
            flex: 1,
            height: 520,
            justifyContent: 'flex-end',
            ...StyleSheet.absoluteFillObject,
            alignItems: 'center',
            // position: 'absolute',
            // height: '50%',
            // top: 0,
            // left: 0,
            // right: 0,
            // bottom: 300,

        },
        button: {
            flex: 1,
            marginLeft: 130,
            marginBottom: 20,
            marginTop: 450,
            // justifyContent: 'center',
            // alignItems: 'center',
            height: 75,
            width: 100,
        },
        // view2: {
        //     flex: 2,
        //     marginTop: 450,
        //     // ...StyleSheet.absoluteFillObject,

        //     // position: 'absolute',
        //     // alignItems: 'left',


        // },
        view1: {
            height: 200,
            flex: 1,
            ...StyleSheet.absoluteFillObject,

        },
        // button: {
        //     // marginBottom: 30,
        //     width: 260,
        //     // alignItems: 'center',
        //     backgroundColor: '#2196F3'
        // },
        // pin: {
        //     backgroundColor: "#fffa",
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     borderColor: 'black',
        //     borderWidth: 1,
        //     padding: 5,
        //     borderRadius: 5
        // },
        // pinImage: {
        //     width: 20,
        //     height: 20
        // },
        // pinText: {
        //     color: 'red'
        // }
        // ,
        // callout: {
        //     flex: 1,
        //     paddingRight: 10,
        //     paddingBottom: 10,
        //     marginBottom: 10,
        //     marginRight: 10
        // },
        // calloutPhoto: {
        //     flex: 1,
        //     width: 200,
        //     height: 80
        // },
        // calloutTitle: {
        //     fontSize: 16
        // }


    }
// export default mapView;



