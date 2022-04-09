import {useState} from "react";

const DiaryEditor = () => {
    //input, textarea에 사용할 State를 하나로 묶을 수 있다.
    const [state, setState] = useState({
        author: "", 
        content: "",
        emotion: 1,
    });

    //onChange 이벤트 핸들러 합치기 
    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        console.log(state);
        alert("저장 성공");
    };
    // const [author, setAuthor] = useState("");
    // const [content, setContent] = useState("");

    return <div className="DiaryEditor">
        <h2>오늘의 일기</h2>
        <div>
            <input 
                name='author'
                value={state.author} 
                onChange={handleChangeState}    //합쳐진 이벤트 핸들러 함수 사용
                // onChange={(e)=>{
                //     //console.log(e.target.value);    //이벤트가 발생하는 target element의 변화된 value값 
                //     //console.log(e.target.name);     //target elemenet의 name값
                //     setState({
                //         ...state,
                //         author: e.target.value,
                //         //content: state.content,
                //     });
                // }} 
            />
        </div>
        <div>
            <textarea 
                name='content'
                value={state.content} 
                onChange={handleChangeState}    //합쳐진 이벤트 핸들러 함수 사용
                // onChange={(e)=>{
                //     //console.log(e.target.value);
                //     setState({
                //         ...state,
                //         //author: state.author,
                //         content: e.target.value,
                //     });
                // }}
            />
        </div>
        <div>
            오늘의 감정점수 : 
            <select 
                name='emotion' 
                value={state.emotion} 
                onChange={handleChangeState}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
            </select>
        </div>
        <div>
            <button onClick={handleSubmit}>일기 저장하기</button>
        </div>
    </div>;
};

export default DiaryEditor;