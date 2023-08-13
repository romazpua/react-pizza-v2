export type FetchPizzaArgs = {
    category: string;
    sortBy: string;
    order: string;
    search: string;
    currentPage: string;
}

export type PizzaItem = {
    id: string;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export interface PizzaSliceState {
    items: PizzaItem[];
    status: Status;
}

export type SearchPizzaParams = {
    category: string;
    sortBy: string;
    order: string;
    search: string;
    currentPage: string;
}