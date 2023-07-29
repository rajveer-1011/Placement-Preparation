import axios from 'axios'

const API_URL = 'http://localhost:5000/api/forum/'
const API_URL_CHAT = 'http://localhost:5000/api/forum/chat/'


// Get Groups
const getGroups = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL,config)
    return response.data
}

// Get Group
const getGroup = async (Data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    console.log(Data);
    const response = await axios.get(API_URL+Data, config)
    return response.data
}

// Create New Group
const createGroup = async (Data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    console.log(Data);
    const response = await axios.post(API_URL, Data, config)
    return response.data
}

// Delete Group
const deleteGroup = async (Data,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const{id, navigate, toast}=Data
    const response = await axios.delete(API_URL+id, config)
    toast.success("Group deleted Successfully");
    navigate("/forum");
    return response.data
}

// Get Msgs
const getMsgs = async (Data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL_CHAT+Data,config)
    return response.data
}

// Create New Msg

const createMsg = async (Data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const {path } = Data
    const response = await axios.post(API_URL_CHAT+path, Data, config)
    return response.data
}

const postServices = {
    getGroups,
    createGroup,
    deleteGroup,
    getMsgs,
    getGroup,
    createMsg,
}

export default postServices