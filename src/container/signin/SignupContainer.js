import { connect } from "react-redux"
import Signup from "../../component/signin/Signup";

const SignupContainer = props => {
    return <Signup history={props.history}/>

}

export default SignupContainer;