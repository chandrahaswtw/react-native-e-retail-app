const initialState = {
    localID : null,
    tokenID : null
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                localID : action.value.localId,
                tokenID : action.value.idToken
            }
        default:
            return state
    }
}

export default AuthReducer;