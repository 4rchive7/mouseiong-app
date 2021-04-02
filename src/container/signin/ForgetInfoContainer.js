import { connect } from "react-redux"
import ForgetInfo from "../../component/signin/ForgetInfo";

const ForgetInfoContainer = props =>{
    return <ForgetInfo history={props.history}/>
}

export default ForgetInfoContainer;