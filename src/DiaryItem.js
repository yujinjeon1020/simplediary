import { useRef, useState } from "react";

const DiaryItem = ({onEdit, onRemove, id, author, content, created_date, emotion}) => {

    //수정중인지 아닌지 여부(boolean)
    const [isEdit, setIsEdit] = useState(false);

    //수정상태가 아닐 때(false-기본값) 수정하기 버튼을 누르면 수정상태(isEdit)은 true로 변해서 textarea가 나타나고
    //수정상태일 때(isEdit === true) 수정하기 버튼을 누르면 수정상태(isEdit)은 false로 변해서 textarea가 사라지고 기본 content만 나타남
    const toggleIsEdit = () => {
        setIsEdit(!isEdit);
    };

    //content -> localContent 로 수정
    const [localContent, setLocalContent] = useState(content);

    //수정 취소시 수정상태 false로 및 content 초기화(원래값으로)
    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(content);
    };

    //수정완료 버튼 클릭 시 동작될 함수
    const handleEdit = () => {
        if(localContent.length < 5) {
            localContentInput.current.focus();
            return;
        }
        if(window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
            onEdit(id, localContent);
            toggleIsEdit(!isEdit);  //수정 완료이므로 수정 상태는 false가 되어 수정form 닫음
        }        
    };

    //useRef 사용하여 수정시 글자수 부족할 경우 focus 시킴
    const localContentInput = useRef();

    //삭제하기 버튼 클릭 시 동작될 함수
    const handleRemove = () => {
        //console.log(id);
        if(window.confirm(`${id}번째 일기를 삭제하시겠습니까?`)) {
            onRemove(id);
        }
    };
    return (
        <div className="DiaryItem">
            <div className="info">
                <span> 작성자: {author} | 감정점수: {emotion}</span>
                <br/>
                <span className="date">{new Date(created_date).toLocaleString()}</span>
            </div>
            <div className="content">
                {/* isEdit이 true면 수정form(textarea)를 보여주고, false면 그냥 content를 보여줌 */}
                {isEdit ? 
                (<><textarea ref={localContentInput} value={localContent} onChange={(e) => setLocalContent(e.target.value)}/></>) : 
                (<>{content}</>)
                }
            </div>

            {isEdit ? 
            // 수정 true
            (<>
            <button onClick={handleQuitEdit}>수정 취소</button>
            <button onClick={handleEdit}>수정 완료</button>
            </>) : 
            // 수정 false
            (<>
            <button onClick={handleRemove}>삭제하기</button>
            <button onClick={toggleIsEdit}>수정하기</button>
            </>)}            
        </div>
    );
};

export default DiaryItem;