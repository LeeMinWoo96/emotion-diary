import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from './pages/Home';
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import RouteTest from "./components/RouteTest";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <h2>App.js</h2>


                {/*<Routes>*/}
                {/*    <Route path='/' element={<Home />}></Route>*/}
                {/*    <Route path='/new' element={<New />}></Route>*/}
                {/*    <Route path='/edit' element={<Edit />}></Route>*/}
                {/*    <Route path='/diary/:id' element={<Diary />}></Route>*/}
                {/*</Routes>*/}
                {/*/!*아래처럼 하면 이동할때마다 새로고침함 --> spa 방식의 장점아 아님 // 이걸 다중 페이지 방식에서나*!/*/}
                {/*<a href={"/new"}> New 로이동</a>*/}
                {/*<br/>*/}
                {/*<RouteTest />*/}
            </div>
        </BrowserRouter>
    );
}

export default App;
