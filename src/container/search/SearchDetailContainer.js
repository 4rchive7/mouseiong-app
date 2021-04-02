import { useState } from "react";
import { connect } from "react-redux"
import SearchDetail from "../../component/search/SearchDetail"

const SearchDetailContainer = (props) =>{
    console.log("SearchDetailContainer");
    return <SearchDetail history={props.history}/>
}

const getParams = (state) =>{
    return {

    };
}

export default SearchDetailContainer;