import Signin from "../../component/signin/Signin"
import MouseionContext from "../../context/MouseionContext";


const SigninContainer = props => {
    return (
        <MouseionContext>
            {({ actions }) => (
                <>
                    <Signin history={props.history} setSignedIn={actions.setSignedIn} isSessionValid={actions.isSessionValid}/>
                    
                </>
            )}
        </MouseionContext>
    )
}



export default SigninContainer;