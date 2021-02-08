import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let [flag, setFlag] = useState(0);


  function displayData() {
    setFlag(flag^=1);
  }

  useEffect(() =>{
    const fetchUsers = async () => {
      try{
        setError(null);
        setUsers(null);
        setLoading(true);
        const response = await axios.get(
          '/test'
        );
        setUsers(response.data);
      }catch(e){
        setError(e);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) return <div>로딩중...</div>
  if (error) return <div>Error is occured</div>
  if (!users) return null;
  return (
    <div className="App">
      <header className="App-header">
        {
          flag > 0
            ? <GetResultFromButton users={users}/>
            : null
        }
        <button onClick={displayData}>Get Data</button>
      </header>
    </div>
  );
}

function GetResultFromButton(props) {
  let index = 0;
  return (
    <div>
    <hr></hr>
      {
        props.users.map((user, index)=>{
          return(<h4 key={++index}>{user.name}의 전화번호는 {user.phone}입니다</h4>);
          
        })
      }
      <hr></hr>

    </div>
  )
}
export default App;
