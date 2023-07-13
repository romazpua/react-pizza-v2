import React, { useContext, useEffect, useRef, useState } from 'react';
import Categories from '../Categories';
import Sort, { sortItems } from '../Sort';
import Skeleton from '../PizzaBlock/Skeleton';
import PizzaBlock from '../PizzaBlock';
import Pagination from '../Pagination';
import { SearchContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../../redux/slices/filterSlice';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = useRef( false )
    const isMounted = useRef( false )

    const { categoryId, sort, currentPage } = useSelector( state => state.filter )
    const { searchValue } = useContext( SearchContext )
    const [ items, setItems ] = useState( [] )
    const [ isLoading, setIsLoading ] = useState( true )

    const onChangeCategory = ( id ) => {
        dispatch( setCategoryId( id ) )
    }


    const fetchPizzas = () => {
        setIsLoading( true )
        const category = categoryId > 0 ? `&category=${ categoryId }` : ``
        const sortBy = sort.sortProperty.replace( '-', '' )
        const order = sort.sortProperty.includes( '-' ) ? 'asc' : 'desc'
        const search = searchValue ? `&search=${ searchValue }` : ''
        axios.get( `https://649492be0da866a95367fe18.mockapi.io/items?page=${ currentPage }&limit=4${ category }${ search }&sortBy=${ sortBy }&order=${ order }` )
        .then( resp => {
            setItems( resp.data )
            setIsLoading( false )
        } )
    }

    // Если изменили параметры и был первый рендер
    useEffect( () => {
        if ( isMounted.current ) {
            const queryString = qs.stringify( {
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            } )
            navigate( `?${ queryString }` )
        }
        isMounted.current = true
    }, [ categoryId, sort.sortProperty, searchValue, currentPage ] )


    // Если был первый рендер, то проверяем URL-параметры и сохраняем их в redux
    useEffect( () => {
        if ( window.location.search ) {
            const params = qs.parse( window.location.search.substring( 1 ) )
            const sort = sortItems.find( obj => obj.sortProperty === params.sortProperty )
            dispatch(
                setFilters( {
                    ...params,
                    sort
                } )
            )
            isSearch.current = true
        }
    }, [] )


    // Если был первый рендер, то запрашиваем пиццы
    useEffect( () => {
        window.scrollTo( 0, 0 )
        if ( isSearch ) {
            fetchPizzas()
        }
        isSearch.current = false
    }, [ categoryId, sort.sortProperty, searchValue, currentPage ] )


    const onChangePage = number => {
        dispatch( setCurrentPage( number ) )
    }


    const pizzas = items.map( ( obj, index ) => <PizzaBlock
        key={ obj.title }{ ...obj }/> )


    const skeletons = [ ...new Array( 8 ) ].map( ( _, index ) => <Skeleton key={ index }/> )


    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={ categoryId }
                    onClickCategory={ ( index ) => onChangeCategory( index ) }
                    categories={ [ 'Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые' ] }/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? skeletons
                        : pizzas
                }
            </div>
            <Pagination value={ currentPage } onChangePage={ onChangePage }/>
        </div>
    );
};

export default Home;