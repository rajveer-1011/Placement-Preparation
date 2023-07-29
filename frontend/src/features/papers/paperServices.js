import axios from 'axios'

const API_URL = 'http://localhost:5000/api/papers/'

// Get All Papers
const getAll = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

// Create new paper
const createPaper = async (Data, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    console.log(Data);
    const response = await axios.post(API_URL,Data , config)
    return response.data
  }

// Delete paper
const deletePaper = async (Data,token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  }
  const{id, navigate, toast}=Data
  const response = await axios.delete(API_URL+id, config)
  toast.success("Paper deleted Successfully");
  navigate("/papers");
  return response.data
}




const postServices = {
    getAll,
    createPaper,
    deletePaper,
}

export default postServices