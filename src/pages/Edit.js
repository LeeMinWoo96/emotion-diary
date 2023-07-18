import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {DiaryStateContext} from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () =>{
    const navigate = useNavigate();
    const {id} = useParams();
    console.log(id)

    const diaryList = useContext(DiaryStateContext);
    const [originData, setOriginData] = useState();

    useEffect(() => {
        if(diaryList.length >= 1){
            const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id))
            console.log(targetDiary)
            if(targetDiary){
                setOriginData(targetDiary);
            }else {
                navigate('/',{replace:true})
            }
        };


    },[id,diaryList])
    const [searchParams, setSearchParams] = useSearchParams();

    return <div>
       <h2>{originData && <DiaryEditor isEdit = {true} originData={originData}/>}</h2>
    </div>
};
export default Edit;