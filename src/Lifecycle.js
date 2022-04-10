import React, { useEffect, useState } from "react";

const UnmountTest = () => {
    //3. Component Unmount Lifecycle 제어 : Mount Lifecycle 제어 방식에 콜백함수 내 콜백함수를 또 주게되면 Unmount 시점에 실행됨
    useEffect(() => {
        console.log("Mount!");  //Mount 시점
        return () => {
            console.log("Unmount!");    //Unmount 시점
        }
    }, []);

    return (
       <div>Unmount Testing Component</div>
    );
};

const Lifecycle = () => {

    const [isVisible, setIsVisible] = useState(false);
    const toggle = () => {
        setIsVisible(!isVisible);
    };

    return (
    <div style={{padding: 20}}>
        <button onClick={toggle}>ON/OFF</button>
        {/* 단락회로 평가(&&): isVisible이 true일 때만 UnmountTest가 동작함 */}
        {isVisible && <UnmountTest />}
    </div>
    );
};

export default Lifecycle;
