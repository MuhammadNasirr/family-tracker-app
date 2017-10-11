import Actions from "../Actions/AuthActions"


const initial_state = {
    Login: "false",
    Signup: "false",
    isRegister: "false",
    CrtCrcle: [],
    PlacesDetails: [],
    DirectionDetail: [],
    // Signup: "false",
    // isRegister: "false",
}

function AuthReducer(state = initial_state, action) {
    switch (action.type) {
        case Actions.Login:
            return Object.assign({}, state, { Login: "true", isRegister: "true" })

        case Actions.Signup:
            return Object.assign({}, state, { Signup: "true", isRegister: "true" })

        case Actions.CreateCircle:
            console.log(action.user + 'heasd')
            return Object.assign({}, state, { CrtCrcle: action.user })

        // case Actions.ListDetails:
        //     return Object.assign({}, state, { PlacesDetails: action.payload })

        // case Actions.GetDirection:
        //     console.log(action.payload)
        //     return Object.assign({}, state, { DirectionDetail: action.payload })

        default:
            return state
    }
}

export default AuthReducer
