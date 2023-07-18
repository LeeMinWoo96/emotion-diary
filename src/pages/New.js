import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

import {useNavigate} from "react-router-dom";
import {useState} from "react";
import DiaryEditor from "../components/DiaryEditor";

const getStringDate = (date) =>{
    return date.toISOString().slice(0,10);
}
const New = () =>{
    return(
        <div>
            <DiaryEditor />
        </div>
    )
};
export default New;