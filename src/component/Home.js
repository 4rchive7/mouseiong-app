import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

const Home = props => {
    const [keyword, setKeyword] = useState(null);
    
     useEffect(()=>{
        if(sessionStorage.getItem('MOUSEION/ACCESSTOCKEN') == null
        || sessionStorage.getItem('MOUSEION/ACCESSTOCKEN') === "invalid"){
            props.history.push("/signin");
        }
    });

    const onClickHandler = () => {
        if(keyword != null) {
            sessionStorage.setItem("keyword", keyword);

            // axios.get('/search/keyword', {
            //     params: { keyword: keyword }
            // }).then(response => {
            //     sessionStorage.setItem("MOUSEION/SearchList/listData", JSON.stringify(response.data));
            // });
            props.history.push("/search");
        }else
            console.log("Keyword is NULL!!!!");
    }

    return (
        <div>
            <input type="text" placeholder="Waiting type something..." onChange={(e) => {
                setKeyword(e.target.value);
            }}/>
            <button onClick={onClickHandler}>Search</button>
        </div>
    );
}
export default connect()(Home);