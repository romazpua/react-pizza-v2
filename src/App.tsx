import './scss/app.scss'
import {Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Pages/Home';
import {lazy, Suspense} from "react";
import Loading from "./components/Loading";

// import Cart from './components/Pages/Cart';
// import NotFound from './components/Pages/NotFound';
// import FullPizza from './components/Pages/FullPizza';

// Rect.lazy
const Cart = lazy(() => import('./components/Pages/Cart'))
const NotFound = lazy(() => import('./components/Pages/NotFound'))
const FullPizza = lazy(() => import('./components/Pages/FullPizza'))

function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/cart'} element={<Suspense
                        fallback={<Loading/>}><Cart/></Suspense>}/>
                    <Route path={'/pizza/:id'} element={<Suspense fallback={<Loading/>}><FullPizza/></Suspense>}/>
                    <Route path={'*'} element={<Suspense
                        fallback={<Loading/>}><NotFound/></Suspense>}/>
                    // Suspense - для ленивой загрузки компонента (lazy)
                </Routes>
            </div>
        </div>
    )
}

export default App