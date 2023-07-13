import './scss/app.scss'
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Pages/Home';
import Cart from './components/Pages/Cart';
import NotFound from './components/Pages/NotFound';
import { createContext, useState } from 'react';

export const SearchContext = createContext( undefined )

function App() {

    const [ searchValue, setSearchValue ] = useState( '' )

    return (
        <div className="wrapper">
            <SearchContext.Provider value={ { searchValue, setSearchValue } }>
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path={ '/' } element={ <Home/> }/>
                        <Route path={ '/cart' } element={ <Cart/> }/>
                        <Route path={ '*' } element={ <NotFound/> }/>
                    </Routes>
                </div>
            </SearchContext.Provider>
        </div>
    )
}

export default App