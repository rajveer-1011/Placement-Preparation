import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import forumServices from './forumServices'

const initialState = {
  msgs: [],
  groups: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create New Group
export const createGroup = createAsyncThunk('create/group', async (Data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await forumServices.createGroup(Data, token)
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

// Get Groups
export const getGroups = createAsyncThunk('getAll/groups', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await forumServices.getGroups(token)
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


// Get Group
export const getGroup = createAsyncThunk('get/group', async (Data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await forumServices.getGroup(Data, token )
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

// Delete Groups
export const deleteGroups = createAsyncThunk('delete/group', async (postData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    console.log(postData)
    return await forumServices.deleteGroup(postData, token)
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




// Get Msgs
export const getMsgs = createAsyncThunk('get/Msg', async (Data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await forumServices.getMsgs(Data, token)
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

// Create New Message
export const createMsg = createAsyncThunk('create/msg', async (Data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await forumServices.createMsg(Data, token)
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

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGroup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.groups.push(action.payload)
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })


      .addCase(getGroups.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.groups = action.payload
      })
      .addCase(getGroups.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })


      .addCase(getGroup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGroup.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.groups = action.payload
      })
      .addCase(getGroup.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })


      .addCase(deleteGroups.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGroups.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.groups = state.groups = state.groups.filter((group) => group._id !== action.payload.id)
      })
      .addCase(deleteGroups.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      

      .addCase(getMsgs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMsgs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.msgs = action.payload
      })
      .addCase(getMsgs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })


      .addCase(createMsg.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createMsg.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.msgs.push(action.payload)
      })
      .addCase(createMsg.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

  },
})

export const { reset } = forumSlice.actions
export default forumSlice.reducer