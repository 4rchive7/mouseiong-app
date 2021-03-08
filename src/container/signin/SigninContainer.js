import { connect } from "react-redux"
import Signin from "../../component/signin/Signin"
import { setSearchKeyword, setSearchList } from "../../store/modules/search/action"

const SigninContainer = props => {
    return <Signin  history={props.history}/>
}



const dispatchToProps = dispatch => ({
    setSearchKeyword: (keyword) => dispatch(setSearchKeyword(keyword)),
    setSearchList : (data) => dispatch(setSearchList(data))
})

const getParams = state => {
    return {
        state : state
    }
}

export default connect(
    getParams,
    dispatchToProps
)(SigninContainer)