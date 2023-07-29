import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import paperServices from './paperServices'


const initialState = {
    papers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    isCreated: false,
    message: '',
}

// get all courses
export const getAll = createAsyncThunk('papers/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await paperServices.getAll(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}
)

// Create new post
export const createPaper = createAsyncThunk('paper/create', async (postData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await paperServices.createPaper(postData, token)
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


// Delete Paper
export const deletePaper = createAsyncThunk('paper/delete', async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await paperServices.deletePaper(postData, token)
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




export const paperSlice = createSlice({
    name: 'papers',
    initialState,
    reducers: {
        reset: (state) =>  initialState ,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAll.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.papers = action.payload
            })
            .addCase(getAll.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(createPaper.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPaper.fulfilled, (state, action) => {
                state.isLoading = false
                state.isCreated = true
                state.papers.push(action.payload)
            })
            .addCase(createPaper.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })


            .addCase(deletePaper.pending, (state) => {
                state.isLoading = true
              })
              .addCase(deletePaper.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.papers = state.papers = state.papers.filter((paper) => paper._id !== action.payload.id)
              })
              .addCase(deletePaper.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
              })
        



    },
})

export const { reset } = paperSlice.actions
export default paperSlice.reducer