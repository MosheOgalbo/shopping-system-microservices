import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCategories } from '../../services/categoriesApi'
import { Category } from '../../types'

export const loadCategories = createAsyncThunk(
  'categories/load',
  async () => {
    const data = await fetchCategories()
    return data as Category[]
  }
)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: { items: [] as Category[], status: 'idle' },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadCategories.pending, state => { state.status = 'loading' })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'succeeded'
      })
  }
})

export default categoriesSlice.reducer
