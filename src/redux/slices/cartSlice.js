import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    totalPrice: 0,
    items: []
}

const computeTotalPrice = ( state ) => state.totalPrice = state.items.reduce( ( total, obj ) => total + obj.price * obj.count, 0 )

const cartSlice = createSlice( {
    name: 'cart',
    initialState,
    reducers: {
        addItem( state, action ) {
            const findItem = state.items.find( obj => obj.id === action.payload.id )
            if ( findItem ) {
                findItem.count++
            } else {
                state.items.push( {
                    ...action.payload,
                    count: 1
                } )
            }
            computeTotalPrice( state )
        },
        minusItem( state, action ) {
            const findItem = state.items.find( obj => obj.id === action.payload )
            if ( findItem.count > 1 ) {
                state.items = state.items.map( obj => {
                    if ( obj.id === action.payload ) {
                        obj.count--
                        computeTotalPrice( state )
                    }
                    return obj
                } )
            } else {
                state.items = state.items.filter( obj => obj.id !== action.payload )
                computeTotalPrice( state )
            }
        },
        removeItem( state, action ) {
            state.items = state.items.filter( obj => obj.id !== action.payload )
            computeTotalPrice( state )
        },
        clearItems( state ) {
            state.items = []
            state.totalPrice = 0
        },
    }
} )

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions

export default cartSlice.reducer