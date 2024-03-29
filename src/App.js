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
            console.log(action.data)
            newState = state.map((it) => it.id === action.data.id ? {...action.data}:it)
            break;
        }
        default:
            console.log(state)
            return state;
    }
    return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();


const dummyData = [
    {
        id : 1,
        emotion: 1,
        content: "오늘의 일기 1점",
        date: 1688948163118
    },
    {
        id : 2,
        emotion: 2,
        content: "오늘의 일기 2점",
        date: 1688948163119
    },
    {
        id : 3,
        emotion: 3,
        content: "오늘의 일기 3점",
        date: 1688948163111
    },

]
function App() {
    const [data, dispatch] = useReducer(reducer, dummyData);
    const dataId = useRef(0);
    const onCreate = (date, content, emotion) =>{

        dispatch({type : "CREATE", data : {
            id : dataId.current,
            date : new Date(date).getTime(),
            content,
            emotion
        }});
        dataId.current += 1;
        console.log(dataId.current);
    }

    const onRemove = (targetId) => {
        dispatch({type : "REMOVE",targetId});
    }

    const onEdit = (targetId, date, content, emotion) => {
        dispatch({
            type : 'EDIT',
            data : {
                id : targetId,
                date : new Date(date).getTime(),
                content,
                emotion
            }
        })
    }

    return (
        <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContext.Provider value={
                {onCreate,onEdit,onRemove}
            }>
                <BrowserRouter>
                    <div className="App">
                        <Routes>
                            <Route path='/' element={<Home />}></Route>
                            <Route path='/new' element={<New />}></Route>
                            <Route path='/edit/:id' element={<Edit />}></Route>
                            <Route path='/diary/:id' element={<Diary />}></Route>
                        </Routes>
                        {/*아래처럼 하면 이동할때마다 새로고침함 --> spa 방식의 장점아 아님 // 이걸 다중 페이지 방식에서나*/}
                        {/*그리고 랜더링을 하는게 언마운트 후 마운트하는거라 ref 값 초기화됌*/}
                        {/*<a href={"/new"}> New 로이동</a> */}
                        <br/>
                        {/*<RouteTest />*/}
                    </div>
                </BrowserRouter>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
}

export default App;
