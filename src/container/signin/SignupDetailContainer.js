import { connect } from "react-redux";
import SignupDetail from "../../component/signin/SignupDetail";

const SignupDetailContainer = props => {
    return <SignupDetail history={props.history}/>
}

export default SignupDetailContainer;

