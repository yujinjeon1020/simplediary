import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {
  //DiaryEditor에서 setData를 이용하여 data의 state를 변화시킨 후
  //그 변화된 data를 DiaryList로 보내서 출력할 것임
  const [data, setData] = useState([]);
  
  //id(index) 증가하도록 DOM에 접근 - useRef() 사용
  const dataId = useRef(0);

  //일기 추가 함수
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content, 
      emotion,
      created_date,
      id: dataId.current,
    }
    dataId.current+=1;  //index 1씩 증가
    setData([newItem, ...data]);  //새로운 데이터 + 원래 데이터
  };

  //일기 삭제 함수
  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`);
    //id가 targetId(삭제한 id)가 아닌 것들만 조회됨
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  //일기 수정 함수
  const onEdit = (targetId, newContent) => {
    setData(
      // id가 수정대상이라면 content -> newContent로 교체. 아니라면 원본 data를 넣어줌
      data.map((it) => it.id === targetId ? {...it, content: newContent} : it)
    );
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      {/* Prop(diaryList)을 통해 배열(dummyList)을 DiaryList 컴포넌트로 전달  */}
      {/* onDelete() 함수는 App.js -> DiaryList -> DiaryItem 루트로 Props 전달 -> App.js에서 DairyItem을 안쓰니까!*/}
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}/>
    </div>
  );
}

export default App;
