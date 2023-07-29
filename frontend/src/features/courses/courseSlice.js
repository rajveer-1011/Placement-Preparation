import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import courseServices from './courseServices'


const initialState = {
    courses: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    isCreated: false,
    message: '',
}

// get all courses
export const getAll = createAsyncThunk('courses/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await courseServices.getAll(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}
)

// Create new post
export const createCourse = createAsyncThunk('course/create', async (postData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await courseServices.createCourse(postData, token)
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
export const deleteCourse = createAsyncThunk('course/delete', async (Data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await courseServices.deleteCourse(Data, token)
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
export const updateCourse = createAsyncThunk('course/update', async (Data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await courseServices.updateCourse(Data, token)
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


export const courseSlice = createSlice({
    name: 'course',
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
                state.courses = action.payload
            })
            .addCase(getAll.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(createCourse.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.isLoading = false
                state.isCreated = true
                state.courses.push(action.payload)
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(deleteCourse.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.courses = state.courses = state.courses.filter((course) => course._id !== action.payload.id)

            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(updateCourse.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.courses = state.courses.map((course) => course._id === action.payload._id ? action.payload:course)

            })
            .addCase(updateCourse.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = courseSlice.actions
export default courseSlice.reducer