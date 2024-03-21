import instance from "../utils/instance"

export const signupRequest = async (data) => {
    try {
        const response = instance.post("/auth/signup",data);
        return response;
    } catch (error) {
        console.log(error);
        return error.response
    }
}

export const OAuth2SignupRequest = async (data) => {
    try {
        const response = instance.post("/auth/oauth2/signup",data);
        return response;
    } catch (error) {
        console.log(error);
        return error.response
    }
}