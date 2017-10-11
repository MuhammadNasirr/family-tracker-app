class Actions {
    static CreateCircle = "CREATECIRCLE"
    static ListDetails = "LISTDETAILS"
    static GetDirection = "GETDIRECTION"
    //   static Longitude = "Longitude"

    static Login = "Login"
    static Signup = "Signup"
    static AllPatient = "Patient"

    static LoginAction(login) {
        return {
            type: Actions.Login,
            login
        }
    }
    static SignupAction(signup) {
        return {
            type: Actions.Signup,
            signup
        }
    }
    static CreateCircleAction(user) {
        console.log(user)
        return {
            type: Actions.CreateCircle,
            user
        }
    }
    static PlacesDetails(Details) {
        console.log(Details)
        return {
            type: Actions.ListDetails,
            payload: Details
        }
    }
    static GetDirections(direction) {
        console.log(direction)
        return {
            type: Actions.GetDirection,
            payload: direction
        }
    }
    // static SignupAction(signup){
    //     return {
    //         type:Actions.Signup,
    //         signup
    //     }
    // }
}

export default Actions;