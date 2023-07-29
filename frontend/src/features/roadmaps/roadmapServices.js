import axios from 'axios'

const API_URL = 'http://localhost:5000/api/roadmaps/'

// Get All Roadmaps
const getAll = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

// Create new roadmaps
const createRoadmap = async (Data, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const{formdata, navigate, toast} = Data
    const response = await axios.post(API_URL, formdata, config)
    toast.success("Roadmap Created Successfully");
    navigate("/roadmaps");
    return response.data
  }

// Delete roadmap
const deleteRoadmap = async (Data,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const{id,navigate, toast}=Data
    const response = await axios.delete(API_URL+id, config)
    toast.success("Roadmap deleted Successfully");
    navigate("/roadmaps");
    return response.data
}


// update roadmap
const updateRoadmap = async (Data,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const{id, formdata, navigate, toast} = Data
    const response = await axios.put(API_URL+id, formdata, config)
    toast.success("Roadmap Updated Successfully");
    navigate("/roadmaps");
    return response.data
}

const postServices = {
    getAll,
    createRoadmap,
    deleteRoadmap,
    updateRoadmap,
}

export default postServices