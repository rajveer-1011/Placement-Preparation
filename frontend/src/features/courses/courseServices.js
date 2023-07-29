import axios from 'axios'

const API_URL = 'http://localhost:5000/api/courses/'

// Get All Courses
const getAll = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

// Create new course
const createCourse = async (Data, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const{formdata, navigate, toast} = Data
    const response = await axios.post(API_URL, formdata, config)
    toast.success("Course Created Successfully");
    navigate("/courses");
    return response.data
  }

// Delete course
const deleteCourse = async (Data,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const{id,navigate, toast}=Data
    const response = await axios.delete(API_URL+id, config)
    toast.success("Course deleted Successfully");
    navigate("/courses");
    return response.data
}


// Update Course
const updateCourse = async (Data,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const{id, formdata, navigate, toast} = Data
    const response = await axios.put(API_URL+id, formdata, config)
    toast.success("Course Updated Successfully");
    navigate("/courses");
    return response.data
}

const postServices = {
    getAll,
    createCourse,
    updateCourse,
    deleteCourse,
}

export default postServices