import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { searchKeyword } from "../../store/api/searchApi";

const SearchList = props => {
    const [liList, setLiList] = useState(null);
    const [jsonData, setJsonData] = useState(null);
    const [isDone, setDone] = useState(true);
    const [keyword, setKeyword] = useState(sessionStorage.getItem("keyword"));
    
    let completed = false;
    const onClickHandler = e => {
        console.log(e.target.id);
        const element = (e.target.id).split('#');
        const id = element[1];
        sessionStorage.setItem("MOUSEION/SearchDetail/id", id);
        sessionStorage.setItem("MOUSEION/SearchDetail/email", jsonData[id].email);
        props.history.push('search/detail');
    }
    const genList = () =>{
        return jsonData.map((json, id)=>{
            return(
                <span id={`detail#${id}`} key={id} onClick={onClickHandler}>
                    <div id='list_id'>
                        <h3 id={`detail#${id}`}> email : {json.email} </h3>
                    </div>
                    <div id='list_company'>
                        <h3 id={`detail#${id}`}> company : {json.company} </h3>
                    </div>
                    <div id='list_name'>
                        <h3 id={`detail#${id}`}> name : {json.name} </h3>
                    </div>
                    <hr/>
                </span>
            );
        });
    }

    useEffect(() => {
        console.log("SearchList useEffect] working");
        const get = async ()=>{
            const result = await searchKeyword(keyword);
            if(completed != true) 
                setJsonData(JSON.parse(sessionStorage.getItem("MOUSEION/SearchList/listData")));
        }     
        if(jsonData == null) get();

        if(jsonData != null && liList == null){
            console.log(jsonData);
            setLiList(genList());
        }
        return () => {
            completed = true;
        };
    }, [jsonData, liList]);

    return (
        <div>
            SearchDetail
            <header className="searchBar">
                <input type="text" placeholder="Ready to go!"></input>
                <button>날려!</button>
            </header>
            <div>
                {isDone ? liList : <Loading setDone={setDone}/>}
                
            </div>
        </div>
    );
}

const Loading = (props)=>{
    let loading = "loading...";
    
    return (
        <div>
            {loading}
        </div>
    );
}

export default connect()(SearchList);