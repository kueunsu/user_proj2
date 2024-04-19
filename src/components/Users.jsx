import React from 'react'

const Users = ({user, toggle, onDelete}) => {
    const style = {
        color : user.active == true ? 'pink' : 'black',
        backgroundColor : user.active == true ? 'black' : 'pink',
        fontWeight : 800,
        cursor : 'pointer',

    }
    return (
    <div>
        {/* 클릭한 경우 대상의 id를 toggle의 인수로 넘기고 함수를 실행함 */}
        <span  style={style} onClick={()=>toggle(user.id)} >{user.username}</span>
        <span>{user.email}</span>
        <button onClick={()=>onDelete(user.id)}>삭제</button>
    </div>
    );
}

export default React.memo(Users);