import axios from 'axios'

const API_URL = 'http://localhost:5000/api/users/'

// Get users
const getAll = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + 'all', config)
    return response.data
}


// delete user
const deleteUser = async (Data,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const{id,navigate, toast}=Data
    const response = await axios.delete(API_URL+id, config)
    toast.success("User Deleted Successfully");
    navigate("/users");
    return response.data
}


// update User
const updateUser = async (Data,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const{id,navigate, toast}=Data
    const response = await axios.get(API_URL+id, config)
    toast.success("User Updated Successfully");
    navigate("/users");
    return response.data
}

const postServices = {
    getAll,
    deleteUser,
    updateUser,
}

export default postServices