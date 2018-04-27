import users from './user'

import axios from 'axios';

const uuidv1 = require('uuid/v1');

export default function (state = {users: users(), content: users()}, action){
   switch (action.type) {

     case "USER_ADD":
        console.log("ADD");
        console.log(state);
        const USER_DEFAULT = {
          id: uuidv1() ,
          age: 0,
          name: "Unknown",
          gender: "male",
          company: "Unknown",
          email: "Unknown",
          phone: "Unknown",
          address: "Unknown"
        };

       const users = state.users;
       users.push(USER_DEFAULT);

       const content = state.content;
       content.push(USER_DEFAULT);

       return {...state, users: users, content: content};

     case "USER_EDITED":
      return {
        ...state,
        users: state.users.map(user => user.id === action.id ?
        Object.assign({}, user, {
          age: action.age,
          name: action.name,
          gender: action.gender,
          company: action.company,
          email: action.email,
          phone: action.phone,
          address: action.address
        }): user),
        content: state.content.map(user => user.id === action.id ?
        Object.assign({}, user, {
          age: action.age,
          name: action.name,
          gender: action.gender,
          company: action.company,
          email: action.email,
          phone: action.phone,
          address: action.address
        }): user)
      }

     case "USER_DELETE":
       return {
                 ...state, users: state.users.filter(user => user.id != action.payload),
                 content: state.content.filter(user => user.id != action.payload)
       }

     case "SORT_ID":
      switch (action.payload) {
        case "id":
        return {
          ...state,
          users: state.users.sort((a,b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
          })
        };
        case "age":
        return {
          ...state,
          users: state.users.sort((a,b) => {
            if (a.age < b.age) return -1;
            if (a.age > b.age) return 1;
            return 0;
          })
        };
        case "name":
        return {
          ...state,
          users: state.users.sort((a,b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          })
        };
        case "gender":
        return {
          ...state,
          users: state.users.sort((a,b) => {
            if (a.gender < b.gender) return -1;
            if (a.gender > b.gender) return 1;
            return 0;
          })
        };
        case "company":
        return {
          ...state,
          users: state.users.sort((a,b) => {
            if (a.company < b.company) return -1;
            if (a.company > b.company) return 1;
            return 0;
          })
        };
        case "email":
        return {
          ...state,
          users: state.users.sort((a,b) => {
            if (a.email < b.email) return -1;
            if (a.email > b.email) return 1;
            return 0;
          })
        };
        case "phone":
        return {
          ...state,
          users: state.users.sort((a,b) => {
            if (a.phone < b.phone) return -1;
            if (a.phone > b.phone) return 1;
            return 0;
          })
        };
        case "address":
        return {
          ...state,
          users: state.users.sort((a,b) => {
            if (a.address < b.address) return -1;
            if (a.address > b.address) return 1;
            return 0;
          })
        };
      }

     case "FILTER":
        switch (action.field) {
          case "id":
          return {
            ...state,
            users: state.content.filter(user => user.id.includes(action.payload))
          };
          case "age":
          return {
            ...state,
            users: state.content.filter(user => (user.age + "").includes(action.payload))
          };
          case "name":
          return {
            ...state,
            users: state.content.filter(user => user.name.includes(action.payload))
          };
          case "gender":
          return {
            ...state,
            users: state.content.filter(user => user.gender.includes(action.payload))
          };
          case "company":
          return {
            ...state,
            users: state.content.filter(user => user.company.includes(action.payload))
          };
          case "email":
          return {
            ...state,
            users: state.content.filter(user => user.email.includes(action.payload))
          };
          case "phone":
          return {
            ...state,
            users: state.content.filter(user => user.phone.includes(action.payload))
          };
          case "address":
          return {
            ...state,
            users: state.content.filter(user => user.address.includes(action.payload))
          };
        };

     case "SAVE_DB":
          var data = state.content;
         /*var data = new FormData();
         data.append( "json", JSON.stringify( state.content ) );*/
         axios.post('/api/users', data)
          /*.then(res => {console.log(res.data)
          })*/
          return state;

     default:
       return state;
   }
}
