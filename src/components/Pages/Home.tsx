import React, {useCallback, useEffect, useRef} from 'react';
import Categories from '../Categories';
import Skeleton from '../PizzaBlock/Skeleton';
import PizzaBlock from '../PizzaBlock';
import Pagination from '../Pagination';
import {useSelector} from 'react-redux';
// import {
//     FilterSliceState,
//     selectFilter,
//     setCategoryId,
//     setCurrentPage,
//     setFilters
// } from '../../redux/slices/filterSlice';
// import {fetchPizzas, SearchPizzaParams, selectPizzaData} from '../../redux/slices/pizzasSlice';
import qs from 'qs';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from "../../redux/store";
import SortPopup from "../SortPopup";
import {selectPizzaData} from "../../redux/pizza/selectors";
import {selectFilter} from "../../redux/filter/selectors";
import {setCategoryId, setCurrentPage} from "../../redux/filter/slice";
import {fetchPizzas} from "../../redux/pizza/asyncActions";


const Home: React.FC = () => {

    // Динамический импорт для код-сплиттинга (для оптимизации загрузки сайта)
    // import('../../utils/math').then(math => {
    //     console.log(math.add(777, 888))
    // })

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const {items, status} = useSelector(selectPizzaData)
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)

    const onChangeCategory = useCallback((idx: number) => {
        dispatch(setCategoryId(idx))
    }, [])

    const onChangePage = (page: number) => {
        console.log(`to page ${page}`)
        dispatch(setCurrentPage(page))
    }


    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `&category=${categoryId}` : ``
        const search = searchValue ? `&search=${searchValue}` : ''

        dispatch(fetchPizzas({
            category,
            sortBy,
            order,
            search,
            currentPage: String(currentPage)
        }))

        window.scrollTo(0, 0)
    }

    // Если изменили параметры и был первый рендер
    // useEffect(() => {
    //     if (isMounted.current) {
    //         const queryString = qs.stringify({
    //             sortProperty: sort.sortProperty,
    //             categoryId,
    //             currentPage
    //         })
    //         navigate(`?${queryString}`)
    //     }
    //     // isMounted.current = true
    //     if (!window.location.search) {
    //         dispatch(fetchPizzas({} as SearchPizzaParams))
    //     }
    //
    // }, [categoryId, sort.sortProperty, searchValue, currentPage])
    //

    useEffect(() => {
        getPizzas()
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    // // Если был первый рендер, то проверяем URL-параметры и сохраняем их в redux
    // useEffect(() => {
    //     if (window.location.search) {
    //         const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
    //         const sort = sortItems.find(obj => obj.sortProperty === params.sortBy)
    //
    //         dispatch(setFilters({
    //             searchValue: params.search,
    //             categoryId: +params.category,
    //             currentPage: +params.currentPage,
    //             sort: sort || sortItems[0]
    //         }))
    //         // isSearch.current = true
    //         isMounted.current = true
    //     }
    // }, [])
    //
    // // Если был первый рендер, то запрашиваем пиццы
    // useEffect(() => {
    //     window.scrollTo(0, 0)
    //     if (isSearch) {
    //         getPizzas()
    //     }
    //     isSearch.current = false
    // }, [categoryId, sort.sortProperty, searchValue, currentPage])


    const pizzas = items.map((obj: any, index: number) => <PizzaBlock key={obj.title}{...obj}/>)
    const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onChangeCategory}/>
                <SortPopup value={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error'
                    ?
                    <div className="content__error-info">
                        <h2>Oops!😕</h2>
                        <p>Failed to get the pizzas</p>
                    </div>
                    :
                    <div className="content__items">
                        {status === 'loading' ? skeletons : pizzas}
                    </div>
            }
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};

export default Home;