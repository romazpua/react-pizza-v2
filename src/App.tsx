import './scss/app.scss'
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Pages/Home';
import Cart from './components/Pages/Cart';
import NotFound from './components/Pages/NotFound';
import FullPizza from './components/Pages/FullPizza';


function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path={ '/' } element={ <Home/> }/>
                    <Route path={ '/cart' } element={ <Cart/> }/>
                    <Route path={ '/pizza/:id' } element={ <FullPizza/> }/>
                    <Route path={ '*' } element={ <NotFound/> }/>
                </Routes>
            </div>
        </div>
    )
}

export default App