import axios from 'axios'


const API_URL = 'http://localhost:5000/api/posts/'


// Get posts
const getPosts = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

// Get post
const getPost = async (path, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + path, config)
  return response.data
}

// Create new post
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const{navigate, toast}=postData
  const response = await axios.post(API_URL, postData, config)
  toast.success("Post Added Successfully");
  navigate("/");
  return response.data
}

// Update post
const updatePost = async (postData,path, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
 // console.log("path", path, "postdata", postData, "config", config);
 const{navigate, toast}=postData
  const response = await axios.put(API_URL+path, postData, config)
  toast.success("Post Updated Successfully");
  navigate("/");
  return response.data

}

// Add post view
const addPostView = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL+'view/'+id, config)

  return response.data
}

// Delete post
const deletePost = async (postData,token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  }
  const{path,navigate, toast}=postData
  const response = await axios.delete(API_URL+path, config)
  toast.success("Post Deleted Successfully");
  navigate("/");
  return response.data
}

const postServices = {
  getPosts,
  createPost,
  getPost,
  updatePost,
  addPostView,
  deletePost,
}

export default postServices