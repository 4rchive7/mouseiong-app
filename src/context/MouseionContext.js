import { createContext, useState } from "react";
import { isEmpty } from "../util/StringUtils";

const MouseionContext = createContext({
  state:{
      signedIn : "false"
  } , 
  actions:{
      setSignedIn: ()=>{}
  }
});

const MouseionProvider = ({children})=>{
    const [signedIn, setSignedIn] = useState("false");
    
    const isSessionValid = () => {
        const refreshToken = localStorage.getItem("MOUSEION/REFRESH_TOKEN");
        let result = true;
        
        if(isEmpty(refreshToken)){
            result = false;
        }
        return result;
    }

    const value = {
        state : {signedIn},
        actions:{setSignedIn, isSessionValid}
    }
    return(
        <MouseionContext.Provider value={value}>{children}</MouseionContext.Provider>
    )
}

const {Consumer : MouseionConsumer} = MouseionContext

export {MouseionProvider, MouseionConsumer};

export default MouseionContext;