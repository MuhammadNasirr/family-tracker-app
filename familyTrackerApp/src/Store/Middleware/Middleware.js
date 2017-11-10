import * as firebase from 'firebase';
import Actions from '../Actions/AuthActions';
import { AsyncStorage } from "react-native";
import axios from "axios";
import _ from 'lodash'



const region = {
    latitude: 24.8716,
    longitude: 67.0599,
    latitudeDelta: 0.4922,
    longitudeDelta: 0.3421,
}
// const initialLat = '';
const userDetails = '';
const uid = '';
const currentuser = '';
class Middleware {
    static signupUser(docDetails) {
        userDetails = docDetails
        console.log(docDetails)
        return (dispatch) => {
            let auth = firebase.auth();
            auth.createUserWithEmailAndPassword(docDetails.email, docDetails.pass)
                .then((user) => {
                    uid = user.uid;
                    docDetails._id = uid;
                    firebase.database().ref(`/Users/${uid}`).set(docDetails);
                    dispatch(Actions.SignupAction())
                    // props.navigation.navigate('login')
                })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
        }
    }
    static loginUser(props, docDetails) {
        return (dispatch) => {
            let auth = firebase.auth();
            auth.signInWithEmailAndPassword(docDetails.email, docDetails.pass)
                .then(async (user) => {
                    console.log(user, 'curent user')
                    // alert('Successfully Login!')
                    props.navigation.navigate('MapVeiw')
                    //await AsyncStorage.removeItem('xyz');
                    let currentUser = { email: docDetails.email, pass: docDetails.pass, _id: user.uid };
                    await AsyncStorage.setItem('xyz', JSON.stringify(currentUser));
                    userDetails = user.uid
                    console.log(userDetails, 'uid')
                    //currentuser = user
                    // console.log(user + " current User")
                })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMesssage = error.message;
                    alert(errorMesssage + "asd")
                })
            console.log(docDetails, 'asdasd')

            dispatch(Actions.LoginAction(true))
        }
    }
    static signoutUser() {
        return (dispatch) => {
            const logout = firebase.auth()
            logout.signOut().then(() => {
                AsyncStorage.removeItem("xyz")
                    .then(() => {
                        userDetails = ''
                        dispatch(Actions.LoginAction(false))
                    })
            })
        }
    }
    static getCurrentLocation() {
        return (dispatch) => {
            navigator.geolocation.getCurrentPosition((position) => {
                const latlong = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
                AsyncStorage.getItem("xyz")
                .then((responce) => {
                    id = JSON.parse(responce)
                    uid = id._id
                    console.log("uid ", uid)
                })
                console.log("uid ", userDetails)
                const db = firebase.database().ref(`/Users/${uid}`).child("Location")
                db.set(latlong)
                dispatch(Actions.userLocation(position.coords))
            })
        }

    }
    static createCircle(circleName) {
        //   console.log(currentuser)
        console.log(circleName.name)
        //console.log(latlon + "latitude")
        var arr = [];
        var user = [];

        return (dispatch) => {
            name = circleName.name;
            firebase.database().ref('/Users').on('value', (snapshot) => {
                console.log(snapshot.val())
                var obj = snapshot.val()
                for (var prop in obj) {
                    arr.push(obj[prop]);
                    console.log(arr);
                }
                // console.log(arr[0]);

                arr.map((crntusr, index) => {

                    if (crntusr._id === userDetails) {
                        user.push(crntusr.email)
                    }
                    currentuser = user
                })
                console.log(user)

            })
            const dbkey = firebase.database().ref("/Circle").push().key
            const groupCode = dbkey.slice(1, 7)

            const newgroup = {
                adminId: userDetails,
                circleName: name,
                JoiningCode: groupCode,
                groupKey: dbkey,
                members: [userDetails],
            }
            firebase.database().ref(`Circle/${dbkey}`).set(newgroup)
                .then(async (data) => {
                    console.log(data)
                })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });


            dispatch(Actions.CreateCircleAction(circleName))

        }
    }
    static showGroups() {
        return (dispatch) => {
            const grp = [];
            firebase.database().ref('/Circle').once("value", (groups) => {
                var grps = groups.val()
                for (var a in grps) {
                    grp.push(grps[a]);
                    console.log(grp);
                }
            }).then(() => {

                console.log(grp)
                //console.log(userDetails)

                const abc = grp.filter((m) => {
                    if (m.hasOwnProperty("members")) {
                        for (a = 0; a < m.members.length; a++) {
                            if (m.members[a] === userDetails) {
                                return m
                            }
                        }
                    }
                })
                console.log(abc)
                dispatch(Actions.userAllGroups(abc))
            })
        }
    }
    static joinGroup(code) {
        console.log(code, "joining key")
        return (dispatch) => {
            const allcircles = []
            const dataFilter = []
            var asd = []
            var groupKey = ''
            const codekey = ''
            firebase.database().ref('/Circle').once("value", (groups) => {
                var grps = groups.val()
                for (var a in grps) {
                    allcircles.push(grps[a]);
                    console.log(allcircles);
                    allcircles.map((obj) => {
                        codeKey = obj.JoiningCode

                        //comparing groups keys
                        if (codeKey === code) {

                            groupKey = obj.groupKey

                            asd = obj.members

                        }
                    })
                }


            }).then(() => {
                //if key is correct 
                console.log(asd, groupKey, "yaoooo")

                if (groupKey !== '' && asd[0] !== undefined) {

                    AsyncStorage.getItem("xyz")
                        .then((responce) => {
                            console.log(responce)
                            uid = JSON.parse(responce)
                            asd.push(uid._id)
                            console.log(groupKey, "aaskljdhaksjdh")

                            const dataPush = firebase.database().ref(`Circle/${groupKey}/members`)
                            dataPush.set(asd)

                        })
                    dispatch(Actions.JoinGroup())
                }
            })
        }
    }
    static userDetail(detail) {
        console.log(detail)
        return (dispatch) => {
            let array = []
            detail.members.map((m, v) => {
                let dbase = firebase.database().ref(`Users/${m}`)
                dbase.once("value", (object) => {
                    let key = object.val()
                    console.log(key)
                    array.push(key)
                    // for (var a in key) {
                    //     array.push(key[a])
                    // }
                })
                    .then(() => {
console.log(array)
                        dispatch(Actions.UserDetail(array))
                    })
            })
        }
    }
}
export default Middleware;
