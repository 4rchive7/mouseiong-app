import Home from "../component/Home";
import MouseionContext from "../context/MouseionContext";


const HomeContainer = (props) => {
    return (
        <MouseionContext>
            {({state, actions})=>(
                <>
                    {console.log(state.signedIn)}
                    {state.signedIn ? null : props.history.push("/signin")}
                    <Home history={props.history} setSignedIn={actions.setSignedIn} isSessionValid={actions.isSessionValid}/>
                </>
            )}
        </MouseionContext>
    )
}


export default HomeContainer;