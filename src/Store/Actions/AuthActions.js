class Actions {
    static CreateCircle = "CREATECIRCLE"
    // static ListDetails = "LISTDETAILS"
    // static GetDirection = "GETDIRECTION"
    //   static Longitude = "Longitude"

    static Login = "Login"
    static Signup = "Signup"
    static logout = "logout"
    static AllPatient = "Patient"
    static Location = "Location"
    static showAllGroups = "showAllGroups"
    static UserJoinGroup = "UserJoinGroup"
    static getUserDetail = "getUserDetail"

    static LoginAction(boolean) {
        return {
            type: Actions.Login,
            boolean
        }
    }
    static SignupAction(signup) {
        return {
            type: Actions.Signup,
            signup
        }
    }
    static UserLogout() {
        return {
            type: Actions.logout
        }
    }
    static userLocation(value){
        return{
            type:Actions.Location,
            value

        }
    }
    static CreateCircleAction(user) {
        console.log(user)
        return {
            type: Actions.CreateCircle,
            user
        }
    }
    static userAllGroups(value) {
        console.log(value)
        return {
            type: Actions.showAllGroups,
            data: value
        }
    }
    static JoinGroup() {
        return {
            type: Actions.UserJoinGroup,

        }
    }
    static UserDetail(value) {
        return {
            type: Actions.getUserDetail,
            data: value

        }
    }
   
}

export default Actions;