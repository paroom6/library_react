/** @jsxImportSource @emotion/react */
import { Link, useSearchParams } from "react-router-dom";
import * as s from "./style";
import { useEffect, useState } from "react";
function AdminSearchPageNumbers({bookCount}) {
    const [ searchParams ] = useSearchParams();
    const [ numbers, setNumbers ] = useState([]);
    const page = searchParams.get("page");
    const maxPageNumber = bookCount.maxPageNumber;
    useEffect(() =>{
        const startPageNumber = page % 10 === 0 ? page - 9 : (page - page % 10) + 1;
        const endPageNumber = startPageNumber + 9 > maxPageNumber ? maxPageNumber : startPageNumber + 9;

        let pageNumbers = [];
        for (let i = startPageNumber; i <= endPageNumber; i++) {
            pageNumbers = [...pageNumbers, i];
        }
        setNumbers(() => pageNumbers);
    },[bookCount, page])
    return (
        <div css={s.layout}>
            <div css={s.pageNumbers}>
                {
                    parseInt(page) !== 1 &&
                    <Link css={s.pageButton(false)} to={`/admin/book/management?page=${page - 1}`}>&#60;</Link>
                }
                {
                    numbers.map(number => 
                        <Link key={number} css={s.pageButton(number === parseInt(page))} to={`/admin/book/management?page=${number}`}>{number}</Link>    
                    )
                }
                {
                    parseInt(page) !== maxPageNumber &&
                    <Link css={s.pageButton(false)} to={`/admin/book/management?page=${parseInt(page) + 1}`}>&#62;</Link>
                }
            </div>
            <div css={s.pageCount}>
                <div css={s.page}>Page {page} of {maxPageNumber} Count: {bookCount.totalCount}</div>
            </div>
        </div>
    );
}

export default AdminSearchPageNumbers;