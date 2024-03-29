import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {DiaryStateContext} from "../App";
import MyHeader from "../components/MyHeader";
import {getStringDate} from "../util/date";
import MyButton from "../components/MyButton";
import {emotionList} from "../util/emotion";

const Diary = () =>{
    const {id} = useParams();
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const [data, setData] = useState();
    useEffect(()=>{
        if(diaryList.length >= 1) {
            const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));
            console.log(targetDiary)

            if(targetDiary){
                setData(targetDiary);
            }else{
                alert("없는 일기입니다.")
                navigate('/',{replace:true})
            }
        }
    },[id,diaryList])

    if(!data){
        return <div className={"DiaryPage"}>로딩중입니다...</div>
    }else{
        const curEmotionData = emotionList.find(
            (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
        );
        console.log(curEmotionData);
        return(
            <div className={"DiaryPage"}>
                <MyHeader headText={`${getStringDate(new Date(data.date))} 기록`}
                          leftChild={
                            <MyButton text={"< 뒤로가기"} onClick={()=>navigate(-1)}></MyButton>
                            }
                          rightChild={
                            <MyButton text={"수정하기"} onClick={()=>navigate(`/edit/${data.id}`)} ></MyButton>
                          }
                />
                <article>
                    <section>
                        <h4>오늘의 감정</h4>
                        <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
                            <img src={curEmotionData.emotion_img}/>
                            <div className={"emotion_descript"}>
                                {curEmotionData.emotion_description}
                            </div>
                        </div>
                    </section>
                    <section>
                        <h4>오늘의 일기</h4>
                        <div className={"diary_content_wrapper"} >
                            <p> {data.content} </p>
                        </div>
                    </section>
                </article>
            </div>
        )
    }

    console.log(id)
    return <div>
        <h1>Diary</h1>
        <p>이곳은 상세 페이지입니다.</p>
    </div>
};
export default Diary;