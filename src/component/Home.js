import { useEffect, useState } from "react";
import { Encryption } from "../store/api/Encryption";
import { jwtCheckRefreshToken } from "../store/api/userApi";
import { isEmpty } from "../util/StringUtils";

const Home = ({history, setSignedIn, isSessionValid}) => {
    const encryption = new Encryption("raw_data123123");
    console.log(encryption.getEncryptedData);
    const [keyword, setKeyword] = useState(null);

    useEffect(()=>{
        if(!isSessionValid()){
            history.push('/signin');
        }
    });

    useEffect(() => {
        const checkRefreshToken = async ()=>{
            const result = await jwtCheckRefreshToken();
            if(result){
                setSignedIn(true);
                console.log(result);
            }
        }

            checkRefreshToken();

        // if (isEmpty(localStorage.getItem('MOUSEION/REFRESH_TOKEN'))) {
        //     history.push("/signin");
        // }else{
        //     const refreshToken = localStorage.getItem('MOUSEION/REFRESH_TOKEN');
        //     const aid = localStorage.getItem('MOUSEION/AID');
        //     checkRefreshToken(refreshToken, aid);
        // }
    });

    const onClickHandler = e => {
        if (e.target.innerHTML === "Search") {
            if (keyword != null) {
                sessionStorage.setItem("keyword", keyword);
                history.push("/search");
            } else
                console.log("Keyword is NULL!!!!");
        }else if (e.target.innerHTML === "+"){
            console.log("new Task");
        }else if (e.target.innerHTML === "내 정보"){
            history.push("/myinfo");
        }
    }

    return (
        <div>
            <input type="text" placeholder="Waiting type something..." onChange={(e) => {
                setKeyword(e.target.value);
            }} />
            <button onClick={onClickHandler}>Search</button>
            <div onClick={onClickHandler}>+</div>
            <button onClick={onClickHandler}>내 정보</button>
        </div>
    );
}
export default Home;