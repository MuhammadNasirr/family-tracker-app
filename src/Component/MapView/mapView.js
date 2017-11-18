import React, { Component } from 'react'
import { Text, View, ListView, ScrollView, Button, StyleSheet, TouchableOpacity } from 'react-native'
import MapView from "react-native-maps"
import { Container, Drawer, Header, Content, Card, Fab, CardItem, List, ListItem, Thumbnail, Left, Body, Right, Icon, Title, Input, Footer } from 'native-base';
import { connect } from 'react-redux';
import Middleware from '../../Store/Middleware/Middleware';

import NavigationBar from 'react-native-navbar';

function mapDispatchToProps(dispatch) {
    return {
        logout: () => {
            dispatch(Middleware.signoutUser())
        },
        getPosition: () => {
            dispatch(Middleware.getCurrentLocation())
        }

    }
}
function mapStateToProps(state) {
    return {
        latlong: state.Reducers.region,
        logoutasd: state.Reducers.logout

    }
}

class mapView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: 'true',
            // toggled: false,
            latitude: 24.871641,
            longitude: 67.059906,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
            statusBarHeight: {
                flex: 1,
                height: 50,
                justifyContent: 'flex-end',
                ...StyleSheet.absoluteFillObject,
            },

        }
    }
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Family Tracker System',
            headerStyle: { backgroundColor: 'rgb(0,150,136)' },
            headerTitleStyle: { color: '#fff' },
            headerLeft: <Icon name='home' style={{ marginLeft: 10, color: '#fff' }} />,
            headerRight: (<Icon name='md-log-out' onPress={params.handleLogout} style={{ marginRight: 10, color: '#fff' }} />) // custom component
        }
    }
    componentDidMount() {
        this.watchId = navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position.coords.latitude, 'asd')
                latitude: position.coords.latitude
                longitude: position.coords.longitude
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    altitude: 15.0444,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                });
                //    let latlong = this.state.region
                // this.props.getPosition(position.coords)
            },
            this.props.navigation.setParams({ handleLogout: this._signout }),
            (error) => {
                console.log(error)
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        console.disableYellowBox = true
    }
    _signout = () => {
        this.props.logout()
    }
    componentWillReceiveProps(prop) {

        console.log(prop, "next prop")
        if (prop.logoutasd) {
            //alert("sasd")
            prop.navigation.navigate("login")

        }
        if (prop.latlong) {
            console.log(prop.latlong, "next prop")
            
            this.setState({
                longitude: prop.latlong.longitude,
                latitude: prop.latlong.latitude,
            })
        }
    }
    componentWillUnmount() {
        watchId = navigator.geolocation.clearWatch(this.watchID);
        console.log(watchId)

    }
    componentWillMount() {

        setTimeout(() => { this.setState({ statusBarHeight: styles.map }) }, 350)
        setTimeout(() => { this.props.getPosition() }, 300)
        // this.props.getPosition()
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


    // onRegionChange = (region) => {
    //     this.setState({ region: region })
    // }
    onNavigate = () => {
        this.props.navigation.navigate('AllCircle');
    }
    _onNavigate = () => {
        this.props.navigation.navigate('CreateCircle');
    }
    render() {
        return (
            <View
                style={styles.container}>
                <View style={styles.view1}>
                    <MapView
                        provider="google"
                        style={this.state.statusBarHeight}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        showsCompass
                        showsPointOfInternet={false}
                        // initialRegion={{
                        //     latitude: this.state.latitude,
                        //     longitude: this.state.longitude,
                        //     latitudeDelta: this.state.latitudeDelta,
                        //     longitudeDelta: this.state.longitudeDelta,
                        // }}
                        // onRegionChange={this.onRegionChange}
                        mapType="standard"
                        //onPress={this.onMapPress.bind(this)}
                        zoomEnabled={true}
                        pitchEnabled={true}
                        showsBuildings={true}
                        showsTraffic={true}
                        showsIndoors={true}>
                        <MapView.Marker
                            coordinate={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude
                            }}
                            title="My Location"
                            description="nasir"
                        >
                        </MapView.Marker>
                    </MapView>
                </View>
                <View style={{ flex: 1 }}>
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: 'rgb(0,150,136)' }}
                        position="bottomRight"
                        onPress={() => { this._onNavigate() }}>
                        <Icon name="md-person-add" style={{ color: '#fff' }} />
                    </Fab>
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: 'rgb(0,150,136)' }}
                        position="bottomLeft"
                        onPress={() => { this.onNavigate() }}>
                        <Icon name="md-person" style={{ color: '#fff' }} />
                    </Fab>
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(mapView)

const styles =
    {

        container: {
            flexDirection: "column",
            ...StyleSheet.absoluteFillObject,

            flex: 1,
            justifyContent: 'flex-end',
        },
        map: {
            flex: 1,
            height: 560,
            justifyContent: 'flex-end',
            ...StyleSheet.absoluteFillObject,
            // alignItems: 'center',
        },
        button: {
            flex: 1,
            marginLeft: 130,
            marginBottom: 20,
            marginTop: 450,
            height: 75,
            width: 100,
        },
        view1: {
            height: 200,
            flex: 1,
            ...StyleSheet.absoluteFillObject,

        }
    }