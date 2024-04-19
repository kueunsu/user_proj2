import Users from "./Users";
import React from 'react'
const UserList = ({users, toggle, onDelete}) => {
    return (
        <div>
            {users.map(user => (
                <Users key={user.id} user={user} toggle={toggle} onDelete={onDelete}/>
                // 반복되는 것에 id 부여하기
            ))}
            {/* users객체를 돌면서 각각의 username과 email을 출력하는 코드
          map은 js 서버에서는 새로운 배열 생성보다는 각 요소를 전부 순회하는 것에 의미를 더 두는듯 */}
        </div>
    );
}

export default React.memo(UserList);