import {createAsyncThunk} from "@reduxjs/toolkit";
import {PizzaItem, SearchPizzaParams} from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
    'pizzas/fetchPizzasStatus',
    async (params) => {
        const {category, sortBy, order, search, currentPage} = params
        const {data} = await axios.get<PizzaItem[]>(`https://649492be0da866a95367fe18.mockapi.io/items?page=${currentPage}&limit=4${category}${search}&sortBy=${sortBy}&order=${order}`)

        return data
    }
)