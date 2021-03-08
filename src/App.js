/* eslint-disable no-debugger, no-console */
import React from 'react';
import './App.css';
import { Route} from 'react-router-dom';
import HomeContainer from './container/HomeContainer';
import SearchListContainer from './container/search/SearchListContainer';
import SearchDetailContainer from './container/search/SearchDetailContainer';
import Chat from './Chat';
import SigninContainer from './container/signin/SigninContainer';
import SignupDetailContainer from './container/signin/SignupDetailContainer';
import SignupContainer from './container/signin/SignupContainer';

const App = (props) => {
  
  const tempId = "123";
  const onClickHandler = (e)=>{
    if(e.target.innerHTML === "clear session"){
      sessionStorage.setItem("MOUSEION/ACCESSTOCKEN", 'invalid')
    }
    
    if(e.target.innerHTML === "show session"){
      console.log(sessionStorage.getItem("MOUSEION/ACCESSTOCKEN"));
    }
  }

  return (
      <div className="App">
        <header>
          <button onClick={onClickHandler}>clear session</button>
          <button onClick={onClickHandler}>show session</button>
        </header>
        <div className="App-header">     
          <Route exact path="/signin" component={SigninContainer} />        
          <Route exact path="/" component={HomeContainer} />   
          <Route exact path="/signup" component={SignupContainer} />
          <Route exact path="/signup/detail" component={SignupDetailContainer} />
          <Route exact path="/search" component={SearchListContainer} />
          <Route exact path={`/search/detail`} component={SearchDetailContainer} />
          <Route exact path={`/chat`} component={Chat} />   
        </div>
      </div>
  );
}

export default App;