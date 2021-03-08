import { connect } from "react-redux";
import Home from "../component/Home";
import { setSearchKeyword, setSearchList } from "../store/modules/search/action";


const HomeContainer = (props) => {
    return <Home history={props.history}/>
}

const dispatchToProps = dispatch => ({
    setSearchKeyword: (keyword) => dispatch(setSearchKeyword(keyword)),
    setSearchList : (datas) => dispatch(setSearchList(datas))
})

const getParams = (state)=>({
    keyword : state.search.keyword,
    datas : state.search.datas

})

export default connect(
    getParams,
    dispatchToProps
)(HomeContainer);