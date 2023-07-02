import {useNavigate, useSearchParams} from "react-router-dom";

const Edit = () =>{
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
    const mode = searchParams.get('mode');
    console.log(mode)
    return <div>
        <h1>Edit</h1>
        <p>이곳은 수정 페이지입니다.</p>
        <button onClick={()=> setSearchParams({who :"minwoo"})}>QS 바꾸기</button>

        {/*링크를 누르지 않아도 navigate를 이용해서 강제로 페이지 이동시킬 수 있음*/}
        {/*로그인 안한 애가 접근하거나 할떄 쓰임*/}
        <button onClick={()=>navigate('/')}>Home 으로 가기</button>
        <button onClick={()=>navigate('-1')}>뒤로 가기</button>

    </div>
};
export default Edit;