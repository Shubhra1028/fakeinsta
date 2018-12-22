const initState = {
    authErorr : null
}

const authReducer  = (state = initState, action) => {
    switch(action.type){
        case "LOGIN_ERR" : 
            switch(action.err.code){
                case "auth/network-request-failed":
                    return {
                        ...state,
                        authErorr : "You are not connected to the internet"
                    }
                case "auth/user-not-found":
                    return {
                        ...state,
                        authErorr : "You are not registered. Please register yourself first."
                    }
                case "auth/wrong-password":
                    return {
                        ...state,
                        authErorr : "Wrong Password. Check Your Password."
                    }
                default:
                    return {
                        ...state,
                        authErorr : action.err.message
                    }
            }
        case "LOGIN_SUCCESS" :
            console.log("Login Success")
            return {
                ...state,
                authErorr : null
            }
        case "SIGNOUT_SUCCESS" :
            console.log("Signout Success")
            return state

        case "SIGNUP_SUCCESS":
            console.log("SIGNUP_SUCCESS")
            return {
                ...state,
                authErorr : null
            }
        case "SIGNUP_ERROR":
        console.log("SIGNUP_ERROR", action.err.message)
        return {
            ...state,
            authErorr : action.err.message
        }
        default : 
            return state
    }
}

export default authReducer;