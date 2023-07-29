import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import roadmapServices from './roadmapServices'


const initialState = {
    roadmaps: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// get all roadmaps
export const getAll = createAsyncThunk('roadmaps/getAll', async (user, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await roadmapServices.getAll(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}
)

// Create new Roadmap
export const createRoadmap = createAsyncThunk('roadmaps/create', async (Data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await roadmapServices.createRoadmap(Data, token)
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


// delete course
export const deleteRoadmap = createAsyncThunk('roadmaps/delete', async (Data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await roadmapServices.deleteRoadmap(Data, token)
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


// update user
export const updateRoadmap = createAsyncThunk('roadmaps/update', async (Data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await roadmapServices.updateRoadmap(Data, token)
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


export const roadmapSlice = createSlice({
    name: 'roadmaps',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAll.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.roadmaps = action.payload
            })
            .addCase(getAll.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(createRoadmap.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createRoadmap.fulfilled, (state, action) => {
                state.isLoading = false
                state.isCreated = true
                state.roadmaps.push(action.payload)
            })
            .addCase(createRoadmap.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(deleteRoadmap.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteRoadmap.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.roadmaps = state.roadmaps = state.roadmaps.filter((roadmap) => roadmap._id !== action.payload.id)
            })
            .addCase(deleteRoadmap.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(updateRoadmap.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateRoadmap.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.roadmaps = state.roadmaps.map((roadmap) => roadmap._id === action.payload._id ? action.payload:roadmap)
            })
            .addCase(updateRoadmap.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = roadmapSlice.actions
export default roadmapSlice.reducer