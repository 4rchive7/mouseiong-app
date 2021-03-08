import axios from 'axios';
import { useState } from 'react';

const Login = () => {
    const [isOkay, setIsOkay] = useState();
    const onClickHandler = () => {

    }
    return (
        <div>
            <LoginForm isOkay={isOkay} setIsOkay={setIsOkay} />
        </div>
    );
}

const loginAuthRequest = (user)=>{
    const data={
        email : user.email,
        pasword : user.password
    }

    const url = `/api/userList/loginAuth`;
    axios.post(url, user).then((res)=>{
        console.log(res);
    }).catch((error){
        console.log(error);
    });

    return 
}

const LoginForm = ({isOkay, setIsOkay}) => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const onClickHandler = ()=>{
        
    }

    
    useEffect(() => {
        const execute = async () => {
            const url = `/api/userList/loginAuth`;//=${pageStatus.keyword}`;
            try {
                setError(null);
                setResult(null);
                setLoading(true);

                const response = await axios.get(url);
                setResult(response.data);
                setListData(response.data)
                
                setLoading(false);
                setPage("ResultPage");
            } catch (e) {
                setError(e);
            }
        }
        execute();
    }, []);

    if (loading) return <div>loading...</div>
    if (error) return <div> {error}</div>
    if (result == null) return null;

    return (
        <div>
            <input type="text" placeholder="email" onChange={(e)=>{setEmail(e.target.value)}} />
            <input type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}/>
            <button onClick={onClickHandler}>submit</button>
        </div>
    );
}