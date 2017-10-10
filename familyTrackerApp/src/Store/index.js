import { createStore, applyMiddleware, combineReducers, compose } from "redux"
import AuthReducer from "../Store/Reducer/AuthReducer"
import thunk from "redux-thunk"


const middleware = applyMiddleware(thunk)

const rootReducer = combineReducers({
    Patients: AuthReducer,
    
});

const store = createStore(
    rootReducer,
    compose(
        middleware,
    )
);
store.subscribe(() => {
    console.log("store state", store.getState())
})

export default store