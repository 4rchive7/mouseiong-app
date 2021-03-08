import { connect } from "react-redux"
import SearchList from "../../component/search/SearchList";
import { setSearchKeyword, setSearchList } from "../../store/modules/search/action";

const SearchListContainer = (props) => {
    return <SearchList history={props.history}/>
}

const dispatchToProps = dispatch => ({
    setSearchKeyword: (keyword) => dispatch(setSearchKeyword(keyword)),
    setSearchList : (data) => dispatch(setSearchList(data))
})

const getParams = (state)=>({
        keyword : state.search.keyword,
        data : state.search.data
})

export default connect(
    getParams,
    dispatchToProps
)(SearchListContainer);
