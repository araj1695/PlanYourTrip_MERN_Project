import axios from "axios";
const API_URL = "http://localhost:3001/api/users/register"


// user registration
const register = async (userData) => {
    const response = await axios.post("http://localhost:3001/api/users/register", userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}


// user login
const login = async (userData) => {
    const response = await axios.post('http://localhost:3001/api/users/login', userData)
    
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// user logout
const logout =  () => {
    localStorage.removeItem('user')
}



const authServices = {
    register,
    login,
    logout
}

export default authServices