import { StackNavigator, TabNavigator } from "react-navigation";
import Login from "./Component/Login/Login";
import Signup from "./Component/Signup/Signup";
import mapView from "./Component/MapView/mapView";
import ShowAllCircle from "./Component/ShowAllCircle/ShowAllCircle";
import createCircle from "./Component/CreateCircle/createCircle";
import CircleDetails from "./Component/CircleDetails/CircleDetails";


const Naviagte = StackNavigator({
    login: { screen: Login },
  
    MapView: { screen: mapView },
    CreateCircle: { screen: createCircle },
    AllCircle: { screen: ShowAllCircle },
    signup: { screen: Signup },
    CircleDetails: { screen: CircleDetails },

})

export default Naviagte;
