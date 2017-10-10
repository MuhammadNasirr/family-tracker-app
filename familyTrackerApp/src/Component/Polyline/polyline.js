import React, { Component } from 'react'
import { Text, View, ListView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import MapView from "react-native-maps"
import { Container, Button, Content, Card, CardItem, List, ListItem, Thumbnail, Body, Input, Footer } from 'native-base';
import { connect } from 'react-redux';
import Middleware from '../../Store/Middleware/Middleware';


function mapDispatchToProps(dispatch) {
    return {
        // nearBySearch: (latitude, longitude) => {
        //     dispatch(Middleware.nearBySearch(latitude, longitude))
        // },
        getDirections: () => {
            dispatch(Middleware.getDirections())
        },
    }
}
function mapStateToProps(state) {
    return {

        getDirectio: state.Patients.DirectionDetail
    }
    // console.log(NearbyPlaces)
}

class Polyline extends Component {
    constructor(props) {
        super(props)
        this.state = {
            region: {
                latitude: 24.8825,
                longitude: 67.0694,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            },

        }
    }

    static navigationOptions = {
        title: "Place Direction",

    }
    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position.results + 'asd')
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }
                });

            },
            (error) => {
                console.log(error)
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }

        );
        this.props.getDirections()
    }

    render() {
        console.log(this.props.getDirectio)
        return (
            <View style={styles.container}>

                <MapView
                    provider="google"
                    style={styles.map}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsCompass={false}
                    showsPointOfInternet={false}
                    region={this.state.region}
                    //onRegionChange={this.onRegionChange}
                    mapType="standard"
                    // onPress={this.onMapPress.bind(this)}
                    zoomEnabled={true}
                    pitchEnabled={true}
                    showsBuildings={true}
                    showsTraffic={true}
                    showsIndoors={true}>

                     {/* <MapView.Polyline
                        coordinates={this.props.getDirections}
                        strokeWidth={2}
                        strokeColor="red" />  */}

                </MapView>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        justifyContent: 'flex-end',
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        //   width: Dimensions.get('window').width,
        //   height: Dimensions.get('window').height
    },
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Polyline);
