/* eslint-disable no-debugger, no-console */
import React, { useEffect } from 'react';
import './App.css';
import { Route} from 'react-router-dom';
import HomeContainer from './container/HomeContainer';
import SearchListContainer from './container/search/SearchListContainer';
import SearchDetailContainer from './container/search/SearchDetailContainer';
import Chat from './Chat';
import SigninContainer from './container/signin/SigninContainer';
import SignupDetailContainer from './container/signin/SignupDetailContainer';
import SignupContainer from './container/signin/SignupContainer';
import ForgetInfoContainer from './container/signin/ForgetInfoContainer'
import MyInfoContainer from './container/user/MyInfoContainer';
import { MouseionProvider } from './context/MouseionContext';


const App = props => {
  

  return (    
    <MouseionProvider>
      <div className="App">
        <header>
          <button >clear session</button>
          <button >show session</button>
        </header>
        <div className="App-header">     
          <Route exact path="/signin" component={SigninContainer} />        
          <Route exact path="/" component={HomeContainer} />   
          <Route exact path="/signup" component={SignupContainer} />
          <Route exact path="/signup/detail" component={SignupDetailContainer} />
          <Route exact path="/search" component={SearchListContainer} />
          <Route exact path={`/search/detail`} component={SearchDetailContainer} />
          <Route exact path={`/forget`} component={ForgetInfoContainer} />
          <Route exact path={`/myinfo`} component={MyInfoContainer} />
          <Route exact path={`/chat`} component={Chat} />             
        </div>
      </div>
    </MouseionProvider>
  );
}

export default App;