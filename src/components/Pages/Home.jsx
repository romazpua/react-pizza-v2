import React, { useEffect, useState } from 'react';
import Categories from '../Categories';
import Sort from '../Sort';
import Skeleton from '../PizzaBlock/Skeleton';
import PizzaBlock from '../PizzaBlock';

const Home = () => {

    const [ items, setItems ] = useState( [] )
    const [ isLoading, setIsLoading ] = useState( true )

    useEffect( () => {
        fetch( 'https://649492be0da866a95367fe18.mockapi.io/items' )
        .then( response => response.json() )
        .then( data => {
            setItems( data )
            setIsLoading( false )
        } )
    }, [] )

    return (
        <>
            <div className="content__top">
                <Categories
                    catigories={ [ 'Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые' ] }/>
                <Sort sortItems={ [ 'популярности', 'цене', 'алфавиту' ] }/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [ ...new Array( 8 ) ].map( ( _, index ) => <Skeleton key={ index }/> )
                        : items.map( ( obj, index ) => <PizzaBlock key={ obj.title }{ ...obj }/> )
                }
            </div>
        </>
    );
};

export default Home;