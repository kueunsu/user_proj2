export const reducer = (state, action) => {
    switch (action.type){
        case "CHANGE_INPUT":
            return {
            ...state,
          // state를 얕은 복사 -> 원래 값이 변하는 것을 방지
            inputs: {
                ...state.inputs, [action.name] : action.value
            // state를 얕은복사하고 state 안에 있는 inputs을 다시 얕은 복사 -> 내장 객체는 주소 복사되기 때문
            // 즉 state와 inputs 둘 다 얕은 복사 한 후에 inputs 값에서 action.name에 해당하는 키값이 존재하지 않으면
            // [action.name] : action.value 값을 추가해주고 이미 존재하면 값을 action.value로 변경해주라는 코드
            }
        }
        case "INSERT_USER" :
            return {
            ...state, 
            inputs : {
                username : "",
                email : ""
            }, 
            users : state.users.concat(action.newUser)
            }
        case "TOGGLE_USER" :
            return {
            ...state, 
            users : state.users.map(users => action.id === users.id ? {...users, active : !users.active} : users)
            }
        case "DELETE_USER" :
            return {
            ...state, 
            users : state.users.filter(users => action.id != users.id)
            }
        default:
            return state;
        }
    };

export const initialState = {
    inputs : {
    username : "",
    email : ""
    },
    users : [
    {id: 1, username: '휘인', email: 'whee@gmai.com', active: true},
    {id: 2, username: '화사', email: 'hwa@gmail.com', active: true},
    {id: 3, username: '문별', email: 'star@gmail.com', active: true},
    {id: 4, username: '솔라', email: 'sol@gmail.com', active: true},
    ]
} 