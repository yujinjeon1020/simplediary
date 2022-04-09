import DiaryItem from "./DiaryItem";

const DiaryList = ({onDelete, diaryList}) => {
    return (
    <div className="DiaryList">
        <h2>일기 리스트</h2>
        <h4>{diaryList.length}개의 일기가 있습니다.</h4>
        <div>
            {diaryList.map((it) => (
                // Prop 전달 {...it} = {id, author, content, created_date, emotion}
                <DiaryItem key={it.id} {...it} onDelete={onDelete}/>
            ))}            
        </div>
    </div>
    );
};

//Prop의 undefined을 방지
DiaryList.defaultProps = {
    diaryList: [],
};

export default DiaryList;