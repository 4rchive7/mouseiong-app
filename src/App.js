import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as UpperSide from './UpperSide';
import * as LowerSide from './LowerSide';
import { Signup } from './Signup';
import { Home } from './Home';
import './App.css';

function App() {
  
  const url = `/api/userList/`;
  
  // axios.post(url, jsonData).then((res) => {
  //   console.log(res);
  // }).catch((error) => {
  //   console.log(error);
  // })


  return (
    <>
      <div className="App">
        {UpperSide.show()}
        <button>post!!!</button>
        <header className="App-header">
          {/* <Signup /> */}
          <Home />
        </header>
        {LowerSide.show()}
      </div>
    </>
  );
}

/*
  axios({
    url: 'https://localhost:7220/api/userList/',
    method: 'post',
    data: {
      "type" : "Expert",
      "name" : "Dohyeung",
      "email" : "13email231@asldkf.com",
      "password" : "123123",
      "company" : "Financial",
      "location" : "Singil"
    }
  });*/

// function App() {
//   const [users, setUsers] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   let [flag, setFlag] = useState(0);


//   function displayData() {
//     setFlag(flag^=1);
//   }

//   useEffect(() =>{
//     const fetchUsers = async () => {
//       try{
//         setError(null);
//         setUsers(null);
//         setLoading(true);
//         const response = await axios.get(
//           '/test'
//         );
//         setUsers(response.data);
//       }catch(e){
//         setError(e);
//       }
//       setLoading(false);
//     };
//     fetchUsers();
//   }, []);

//   if (loading) return <div>로딩중...</div>
//   if (error) return <div>Error is occured</div>
//   if (!users) return null;
//   return (
//     <div className="App">
//       {UpperSide.show()}
//       <header className="App-header">
//         {
//           flag > 0
//             ? <GetResultFromButton users={users}/>
//             : null
//         }
//         <button onClick={displayData}>Get Data</button>
//       </header>

//       {LowerSide.show()}
//     </div>
//   );
// }

// function GetResultFromButton(props) {
//   let index = 0;
//   return (
//     <div>
//     <hr></hr>
//       {
//         props.users.map((user, index)=>{
//           return(<h4 key={++index}>{user.name}의 전화번호는 {user.phone}입니다</h4>);

//         })
//       }
//       <hr></hr>

//     </div>
//   )
// }
export default App;
