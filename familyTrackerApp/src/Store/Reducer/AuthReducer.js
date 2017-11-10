import Actions from "../Actions/AuthActions"


const initial_state = {
    userLocation: false,
    region: {},

    Login: false,
    logout: false,
    showGroups: false,
    Signup: "false",
    isRegister: "false",
    CrtCrcle: [],
    DirectionDetail: [],
    showGroupsData: [],
    userDetailData: [],
    JoinGroup: false,
    getUserDetail: false,
    // isRegister: "false",
}

function AuthReducer(state = initial_state, action) {
    switch (action.type) {
        case Actions.Login:
            console.log(action.boolean)
            return Object.assign({}, state, { Login: action.boolean, isRegister: "true" })

        case Actions.Signup:
            return Object.assign({}, state, { Signup: "true", isRegister: "true" })

        case Actions.logout:
            return Object.assign({}, state, { Signup: !Signup, Login: !Login, logout: logout, })

        case Actions.Location:
            console.log(action.value)
            return Object.assign({}, state, { userLocation: true, region: action.value })

        case Actions.CreateCircle:
            console.log(action.user , 'heasd')
            return Object.assign({}, state, { CrtCrcle: action.user })

        case Actions.showAllGroups:
            console.log(action.data , 'all circle')
            return Object.assign({}, state, { showGroups: true, showGroupsData: action.data })

        case Actions.UserJoinGroup:
            return Object.assign({}, state, { JoinGroup: true })

        case Actions.getUserDetail:
        console.log(action.data)
            return Object.assign({}, state, { getUserDetail: true, userDetailData: action.data })

        default:
            return state
    }
}

export default AuthReducer
