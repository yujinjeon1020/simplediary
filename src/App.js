import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
// import Lifecycle from './Lifecycle';

const App = () => {
  //DiaryEditor에서 setData를 이용하여 data의 state를 변화시킨 후
  //그 변화된 data를 DiaryList로 보내서 출력할 것임
  const [data, setData] = useState([]);
  
  //id(index) 증가하도록 DOM에 접근 - useRef() 사용
  const dataId = useRef(0);

  //Mount 시점에 API 가져와 초기 데이터로 설정하기
  const getData = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json());
    
    const initData = res.slice(0, 20).map((it) => {
      return {
          author: it.email,
          content: it.body,
          emotion: Math.floor(Math.random() * 5) + 1,
          created_date: new Date().getTime(),
          id: dataId.current++
      }
    });
    setData(initData);
  };

  //Mount
  useEffect(() => {
    getData();
  }, [])

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

  //Memoization을 위한 함수 생성
  //useMemo()의 return은 return 값 그 자체를 리턴하므로, getDiaryAnalysis는 더 이상 함수가 아님
  const getDiaryAnalysis = useMemo(
    () => {
    console.log("일기 분석 시작");

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return {goodCount, badCount, goodRatio};
  }, [data.length]
  );

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;  //함수로서의 호출이 아니라 useMemo()의 리턴값 그자체를 호출!

  return (
    <div className="App">
      {/* <Lifecycle /> */}
      <DiaryEditor onCreate={onCreate}/>
      {/* Prop(diaryList)을 통해 배열(dummyList)을 DiaryList 컴포넌트로 전달  */}
      {/* onDelete() 함수는 App.js -> DiaryList -> DiaryItem 루트로 Props 전달 -> App.js에서 DairyItem을 안쓰니까!*/}
      <div>전체 일기 개수: {data.length}</div>
      <div>기분 좋은 일기 개수: {goodCount}</div>
      <div>기분이 나쁜 일기 개수: {badCount}</div>
      <div>기분이 좋은 일기 비율: {goodRatio}%</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}/>
    </div>
  );
}

export default App;
