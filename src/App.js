import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from './pages/Home';
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import RouteTest from "./components/RouteTest";

//Components
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";
import React, {useReducer, useRef} from "react";


const reducer = (state,action) => {
    let newState = [];
    switch (action.type){
        case 'INIT': {
            return action.data;
        }
        case 'CREATE': {
            newState = [action.data, ...state];
            break; // default 까지 않가기 위해

        }
        case 'REMOVE' : {
            newState = state.filter((it) => it.id !== action.targetId);
            break;
        }
        case 'EDIT' : {
            newState = state.map((it) => it.id === action.data.id ? {...action.data}:it)
            break;
        }
        default:
            return state;
        return newState;
    }
    return state;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();


function App() {

    const [data, dispatch] = useReducer(reducer,[]);

    const dataId = useRef(0);
    const onCreate = (date, content, emotion) =>{
        dispatch({type : "CREATE", data : {
            id : dataId.current,
            data : new Date(date).getTime(),
            content,
            emotion
        }});
        dataId.current += 1;
    }

    const onRemove = (targetId) => {
        dispatch({type : "REMOVE",targetId});
    }

    const onEdit = (targetId, date, content, emotion) => {
        dispatch({
            type : 'EDIT',
            date : new Date(date).getTime(),
            content,
            emotion
        })
    }

    return (
        <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContext.Provider value={
                {onCreate,onEdit,onRemove}
            }>
                <BrowserRouter>
                    <div className="App">
                        <h2>App.js</h2>
                        <Routes>
                            <Route path='/' element={<Home />}></Route>
                            <Route path='/new' element={<New />}></Route>
                            <Route path='/edit' element={<Edit />}></Route>
                            <Route path='/diary/:id' element={<Diary />}></Route>
                        </Routes>
                        {/*아래처럼 하면 이동할때마다 새로고침함 --> spa 방식의 장점아 아님 // 이걸 다중 페이지 방식에서나*/}
                        <a href={"/new"}> New 로이동</a>
                        <br/>
                        {/*<RouteTest />*/}
                    </div>
                </BrowserRouter>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
}

export default App;
