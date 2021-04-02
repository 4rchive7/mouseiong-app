import { connect } from "react-redux"
import SearchList from "../../component/search/SearchList";
import { setSearchKeyword, setSearchList } from "../../store/modules/search/action";

const SearchListContainer = (props) => {
    return <SearchList history={props.history}/>
}


export default SearchListContainer;
