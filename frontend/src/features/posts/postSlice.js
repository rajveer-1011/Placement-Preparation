import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import postServices from './postServices'



const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


// Create new post
export const createPost = createAsyncThunk('posts/create', async (postData, thunkAPI) => {
  try {
    console.log(postData)
    const token = thunkAPI.getState().auth.user.token
    return await postServices.createPost(postData, token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
}
)


// Update new post
export const updatePost = createAsyncThunk('post/update', async (postData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    const {path} = postData
    return await postServices.updatePost(postData, path, token)
    
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
}
)

// Get posts
export const getPosts = createAsyncThunk('posts/getAll', async (_, thunkAPI) => {
  try {
    return await postServices.getPosts()
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
}
)

// Get post
export const getPost = createAsyncThunk('post/get', async (path, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await postServices.getPost(path,token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
}
)

// delete post
export const deletePost = createAsyncThunk('post/delete', async (postData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    console.log(postData)
    return await postServices.deletePost(postData, token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
}
)

// add view to post
export const addPostView = createAsyncThunk('post/view', async (postData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await postServices.addPostView(postData, token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
}
)


export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts.push(action.payload)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(updatePost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts.push(action.payload)
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(getPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = action.payload
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(getPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = action.payload
      })
      .addCase(getPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(addPostView.pending, (state) => {
        state.isLoading = true
        state.posts = []

      })
      .addCase(addPostView.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = action.payload
      })
      .addCase(addPostView.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = postSlice.actions
export default postSlice.reducer