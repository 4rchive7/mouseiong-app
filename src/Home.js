import { useState, useEffect } from 'react';
import axios from 'axios';

export const Home = () => {
    const [currPage, setPage] = useState("SearchPage");
    const [currDataTepe, setDataType] = useState(null);
    const [keyword, setKeyword] = useState(null);
    const [listData, setListData] = useState([]);
    const [detailPageIndex, setDetailPageIndex] = useState([]);
    const [pageStatus, setPageStatus] = useState({
        getListData: null,
        detailPageIndex: -1,
        currPage: "SearchPage",
        keyword: ""
    });
    return (
        <div>
            {currPage === "SearchPage" ? <SearchPage setPage={setPage} keyword={keyword} setKeyword={setKeyword} currDataTepe={currDataTepe} setDataType={setDataType} /> : null}
            {currPage === "GetDataWithKeyword" ? <GetDataWithKeyword setPage={setPage} listData={listData} setListData={setListData} /> : null}
            {currPage === "ResultPage" ? <ResultPage setPage={setPage} pageStatus={pageStatus} setPageStatus={setPageStatus} listData={listData} setListData={setListData} setDetailPageIndex={setDetailPageIndex} /> : null}
            {currPage === "DetailResultPage" ? <ResultPage setPage={setPage} detailPageIndex={detailPageIndex} setDetailPageIndex={setDetailPageIndex} /> : null}
        </div>
    );
}


const SearchPage = ({ setPage, keyword, setKeyword, currDataTepe, setDataType }) => {
    const onClickHandler = () => {
        setPage("GetDataWithKeyword");
    }
    return (
        <div>
            <input type="text" placeholder="Search!!!" onChange={(e) => {
                setKeyword(e.target.value);
            }}></input>
            <button onClick={onClickHandler}>Search</button>
        </div>
    );
}

const GetDataWithKeyword = ({ setPage, listData, setListData }) => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const execute = async () => {
            const url = `/api/userList/search?keyword=journalist`;//=${pageStatus.keyword}`;
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
    return <div></div>;
}


const ResultPage = ({ setPage, setPageStatus, listData, setListData, setDetailPageIndex }) => {
    const [selectId, setSelectId] = useState(-1);
    const onClickHandler = (e)=>{
        e.preventDefault();
        //setSelectId(e.target.getAttribute('id'));
        setDetailPageIndex(e.target.getAttribute('id'));
        console.log(e.target.getAttribute('id'));
        //setPage("DetailResultPage");
    }


    const lis = listData.map((item, index) => { 
        return (
            <li id={index} key={index} onClick={onClickHandler}>{item.name}</li>
        );
    });

    return (
        <div className="temp">
            {
                lis
            }      
        </div>
    );

}


const DetailResultPage = ({ setPage, detailPageIndex, listData }) => {
    const onClickHandler = (e) => {
        // setPage("ResultPage");
    }
    return (
        <div>
            <h3>DetailPage</h3>
            {listData.prototype.toString()}
            <button onClick={onClickHandler}>back</button>
        </div>
    );

}

