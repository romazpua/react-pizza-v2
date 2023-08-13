import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PizzaItem, PizzaSliceState, SearchPizzaParams, Status} from "./types";
import {fetchPizzas} from "./asyncActions";


const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING // loading | success | error
}

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<PizzaItem[]>) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING
            state.items = []
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = Status.SUCCESS
        })
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            console.log(action, 'rejected')
            state.status = Status.ERROR
            state.items = []
        })
    }
})

export const {setItems} = pizzasSlice.actions

export default pizzasSlice.reducer