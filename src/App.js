import './scss/app.scss'
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Pages/Home';
import Cart from './components/Pages/Cart';
import NotFound from './components/Pages/NotFound';

function App() {

    // const url = new URL( 'https://649492be0da866a95367fe18.mockapi.io/items' )
    // url.searchParams.append( 'title', 'пепперони' )
    // useEffect( () => {
    //     fetch( url ).then( data => data.json() ).then( data => console.log( data ) )
    // }, [] )

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path={ '/' } element={ <Home/> }/>
                    <Route path={ '/cart' } element={ <Cart/> }/>
                    <Route path={ '*' } element={ <NotFound/> }/>
                </Routes>
            </div>
        </div>
    )
}

export default App