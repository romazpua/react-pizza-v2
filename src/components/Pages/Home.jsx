import React, { useContext, useEffect, useState } from 'react';
import Categories from '../Categories';
import Sort from '../Sort';
import Skeleton from '../PizzaBlock/Skeleton';
import PizzaBlock from '../PizzaBlock';
import Pagination from '../Pagination';
import { SearchContext } from '../../App';

const Home = () => {

    const { searchValue } = useContext( SearchContext )

    const [ items, setItems ] = useState( [] )
    const [ isLoading, setIsLoading ] = useState( true )
    const [ categoryId, setCategoryId ] = useState( 0 )
    const [ sortType, setSortType ] = useState( { name: 'популярности', sortProperty: 'rating' } )
    const [ currentPage, setCurrentPage ] = useState( 1 )

    useEffect( () => {
        setIsLoading( true )

        const category = categoryId > 0 ? `&category=${ categoryId }` : ``
        const sortBy = sortType.sortProperty.replace( '-', '' )
        const order = sortType.sortProperty.includes( '-' ) ? 'asc' : 'desc'
        const search = searchValue ? `&search=${ searchValue }` : ''

        fetch( `https://649492be0da866a95367fe18.mockapi.io/items?page=${ currentPage }&limit=4${ category }${ search }&sortBy=${ sortBy }&order=${ order }` )
        .then( response => response.json() )
        .then( data => {
            setItems( data )
            setIsLoading( false )
        } )
        window.scrollTo( 0, 0 )
    }, [ categoryId, sortType, searchValue, currentPage ] )

    const pizzas = items.map( ( obj, index ) => <PizzaBlock
        key={ obj.title }{ ...obj }/> )
    const skeletons = [ ...new Array( 8 ) ].map( ( _, index ) => <Skeleton key={ index }/> )

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={ categoryId }
                    onClickCategory={ ( index ) => setCategoryId( index ) }
                    categories={ [ 'Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые' ] }/>
                <Sort
                    value={ sortType }
                    onChangeSort={ ( index ) => setSortType( index ) }
                    sortItems={ [
                        { name: 'популярности ↓', sortProperty: 'rating' },
                        { name: 'популярности ↑', sortProperty: '-rating' },
                        { name: 'цене ↓', sortProperty: 'price' },
                        { name: 'цене ↑', sortProperty: '-price' },
                        { name: 'алфавиту ↓', sortProperty: 'title' },
                        { name: 'алфавиту ↑', sortProperty: '-title' }
                    ] }/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? skeletons
                        : pizzas
                }
            </div>
            <Pagination onChangePage={ number => setCurrentPage( number ) }/>
        </div>
    );
};

export default Home;