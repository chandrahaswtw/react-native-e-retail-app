const initialState = {
    localID: null,
    tokenID: null,
    expiresAt: null
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                localID: action.value.localId,
                tokenID: action.value.idToken,
                expiresAt: action.expiresAt
            }
        case "AUTOLOGIN":
            return {
                localID: action.localID,
                tokenID: action.tokenID,
                expiresAt: action.expiresAt
            }
        default:
            return state
    }
}

export default AuthReducer;