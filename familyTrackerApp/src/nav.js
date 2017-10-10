import { StackNavigator, TabNavigator } from "react-navigation";
import Login from "./Component/Login/Login";
import Signup from "./Component/Signup/Signup";
// import HomePage from "./Components/HomePage/homePage";
import mapView from "./Component/MapView/mapView";
import PlaceDetails from "./Component/PlaceDetails/placeDetails";
import Polyline from "./Component/Polyline/polyline";
import createCircle from "./Component/CreateCircle/createCircle";
// import PatientList from "./Component/PatientList/PatientList";
// import TabNavigation from "./Component/TabNavigation/TabNavigation";
// import Profile from './Components/Profile/profile';
// import TabsNav from './Components/TabsNav/tabsNav';

const Naviagte = StackNavigator({
    // login: { screen: Login },
    // profile: {screen: Profile},
    // patientList: { screen: PatientList },   
    // tabnavigation: { screen: TabNavigation },
    MapView: { screen: mapView },
    CreateCircle: { screen: createCircle },
    signup: { screen: Signup },
    // PlaceDetails: { screen: PlaceDetails },
    // Polyline: { screen: Polyline },
})

export default Naviagte;
