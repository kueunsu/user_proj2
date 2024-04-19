import './App.css';
import React, { useState , useRef, useCallback, useMemo, useReducer } from 'react';
import CreateUser from './components/CreateUser';
import UserList from './components/UserList';
import { initialState, reducer } from './reducer/UserReducer'


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {username, email} = state.inputs; // state의 inputs 값을 구조분해할당
// state.inputs.username = username, state.inputs.email = email로 간단하게 사용하기 위해

const users = state.users;  

  // users의 아이디 설정을 위해 5로 초기화된 useRef 선언
  const nextId = useRef(5); 

  // 이름과 이메일 입력칸에 값을 입력할 때 실행되는 함수 구현
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type : "CHANGE_INPUT",
      name,
      value
    })
    
  },[])

  // 등록 버튼을 눌렀을 때 실행되는 함수 구현
  const onInsert = useCallback(() => {
    if(username === '' || email === '') return;
    // 아무것도 입력하지 않은 경우 등록되지 않게 하기
    dispatch({
      type : 'INSERT_USER',
      newUser :  {id : nextId.current , username , email, active : false}

    })
    nextId.current++;
    // 다음 Id는 숫자가 증가해야하기 때문에 증가시켜주기
  },[username, email]) 
  // username과 email이 초기값인 빈값으로 고정되지 않도록 값이 바뀌면 함수 재정의되도록 []값에 넣어주기

    const toggle = useCallback((id) => {
      dispatch({
        type : "TOGGLE_USER",
        id
      })
    },[])
    // 클릭한 대상의 id를 파라미터로 받아서 users의 모든 user id와 비교
    // 같은 아이디 대상 즉 클릭한 대상의 아이디를 찾은 경우 다른 users 정보는 유지하고 active 정보만 반대로 바꿈

    const onDelete = useCallback((id) => {
      // setUsers(users => users.filter(users => id != users.id))
      // 내가 선택한 id와 다른 id를 가진 user만 남기고 filter 처리하기
      dispatch({
        type : 'DELETE_USER',
        id
      })
    },[])
    
    const CountActiveUsers = (users) => {
      return users.filter(user => user.active == true).length;
    }

    const count = useMemo(()=> CountActiveUsers(users),[users]);

    return (
    <div className="App">
        <CreateUser username={username} email={email} onChange={onChange} onInsert={onInsert} />
        <UserList users={users} toggle={toggle} onDelete={onDelete}/>
        <div>활성 사용자 수 : {count}</div>
    </div>
  );
}

export default App;
