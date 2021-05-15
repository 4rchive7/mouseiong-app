/* eslint-disable no-debugger, no-console */
import React, { useEffect } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import HomeContainer from './container/HomeContainer';
import SearchListContainer from './container/search/SearchListContainer';
import SearchDetailContainer from './container/search/SearchDetailContainer';
import SigninContainer from './container/signin/SigninContainer';
import SignupDetailContainer from './container/signin/SignupDetailContainer';
import SignupContainer from './container/signin/SignupContainer';
import ForgetInfoContainer from './container/signin/ForgetInfoContainer'
import MyInfoContainer from './container/user/MyInfoContainer';
import { MouseionProvider } from './context/MouseionContext';
import ChatContainer from './container/chat/ChatContainer';
import Toolbar from '@material-ui/core/Toolbar';
import { AppBar, fade, IconButton, InputBase, makeStyles, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  grow: {
    flexGrow: 1,
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  main:{
    width:'100%',
    height:'100%'
  },
  App:{
    height:'100%'
  }
}));


const App = props => {
  const styles = useStyles();
  return (
    <MouseionProvider>
      <div className={styles.App}>
        <div className={styles.root}>
          <div>
            <AppBar position="static">
              <Toolbar>
                <IconButton className={styles.menuButton} color="inherit" aria-label="Open drawer">
                  <MenuIcon />
                </IconButton>
                <Typography className={styles.title} variant="h6" color="inherit" noWrap>
                  앱 바
              </Typography>
                <div className={styles.grow} />
                <div className={styles.search}>
                  <div className={styles.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="검색하기"
                    classes={{
                      root: styles.inputRoot,
                      input: styles.inputInput
                    }}
                  />
                </div>
              </Toolbar>
            </AppBar>
          </div>          
        </div>
        <div className={styles.main} position='relative'>
            <Route exact path="/signin" component={SigninContainer} />
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/signup" component={SignupContainer} />
            <Route exact path="/signup/detail" component={SignupDetailContainer} />
            <Route exact path="/search" component={SearchListContainer} />
            <Route exact path={`/search/detail`} component={SearchDetailContainer} />
            <Route exact path={`/forget`} component={ForgetInfoContainer} />
            <Route exact path={`/myinfo`} component={MyInfoContainer} />
            <Route exact path={`/chat`} component={ChatContainer} />
          </div>
      </div>
    </MouseionProvider>
  );
}

export default App;