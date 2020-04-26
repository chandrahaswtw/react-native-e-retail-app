const initialState = {
    localID: null,
    tokenID: null,
    expiresAt: null,
    didTryAutoLogin: false,
    isAuthenticated: false
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                localID: action.value.localId,
                tokenID: action.value.idToken,
                expiresAt: action.expiresAt,
                isAuthenticated: true
            }
        case "AUTOLOGIN":
            return {
                localID: action.localID,
                tokenID: action.tokenID,
                expiresAt: action.expiresAt,
                isAuthenticated: true
            }
        case "TRYAUTOLOGIN":
            return {
                ...state,
                didTryAutoLogin : true
            }
        case "LOGOUT":
        return {
            ...initialState,
            didTryAutoLogin: true, 
        }
        default:
            return state
    }
}

export default AuthReducer;