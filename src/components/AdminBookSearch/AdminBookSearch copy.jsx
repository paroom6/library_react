/** @jsxImportSource @emotion/react */
import Select from "react-select";
import * as s from "./style";
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from "react-query";
import { useReactSelect } from "../../hooks/useReactSelect";
import { useBookRegisterInput } from "../../hooks/useBookRegisterInput";
import { getBookCountRequest, searchBookRequest, searchBooksRequest } from "../../apis/api/bookApi";
import { useSearchParams } from "react-router-dom";
import AdminSearchPageNumbers from "../AdminSearchPageNumbers/AdminSearchPageNumbers";

function AdminBookSearch({ SelectStyle,bookTypeOptions, categoryOptions}) {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ bookList ,setBookList] = useState([]);
    const checkBoxRef = useRef();
    const searchCount = 20;
    const searchBookQuery = useQuery(
        ["searchBooksQuery", searchParams.get("page")],
        async () => await searchBooksRequest({
            page: searchParams.get("page"),
            count: searchCount,
            bookTypeId: selectedBookType.option.value,
            categoryId: selectedCategory.option.value,
            searchTypeId: selectedSearchType.option.value,
            searchText: searchText.value
        }),
        {   
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log(response);
                setBookList(() => response.data.map(book => {
                    return {
                        ...book,
                        checked: false
                    }
                }));
            },
            
        }
    )
    const getBookCountQuery = useQuery(
        ["getBookCountQuery", searchBookQuery.data],
        async () => await getBookCountRequest({
            count: searchCount,
            bookTypeId: selectedBookType.option.value,
            categoryId: selectedCategory.option.value,
            searchTypeId: selectedSearchType.option.value,
            searchText: searchText.value
        }),
        {   
            onSuccess: response => {
                console.log(response);

            },
            
        }
    )
    const searchSubmit = () => {
        setSearchParams({page: 1});
        searchBookQuery.refetch();
    }

    const selectedBookType = useReactSelect({value: 0 ,label:"전체"});
    const selectedCategory = useReactSelect({value: 0 ,label:"전체"});
    const selectedSearchType = useReactSelect({value: 0 ,label:"전체"});
    const searchText = useBookRegisterInput(searchSubmit);
   
    const searchTypeOptions = [
        {value: 0, label: "전체"},
        {value: 1, label: "도서명"},
        {value: 2, label: "저자명"},
        {value: 3, label: "출판사"},
        {value: 4, label: "ISBN"}
    ]
    const handleAllCheckOnChange = (e) => {
        setBookList(() =>bookList.map(book => {
            return {
                ...book,
                checked: e.target.checked
            }
        }));
    }

    const handleCheckOnChange = (e) => {
        const bookId = parseInt(e.target.value);
        setBookList(() =>bookList.map(book => {
            if (bookId === book.bookId) {
                return {
                    ...book,
                    checked: e.target.checked
                }
            } else {
                return book
            }
            }));
        if(!e.target.checked) {
            checkBoxRef.current.checked = false
        }
        
    }
    useEffect(() => {
        for(let book of bookList) {
            checkBoxRef.current.checked = book.checked;
            if(!checkBoxRef.current.checked) {
                break;
            }
        }
        
    },[bookList])
    return (
        <div>
            <div css={s.searchBar}>
                <Select 
                    styles={SelectStyle} 
                    options={[{value: 0 ,label:"전체"}, ...bookTypeOptions]}
                    defaultValue={selectedBookType.defaultValue}
                    value={selectedBookType.option}
                    onChange={selectedBookType.handleOnChange}
                />
                <Select 
                    styles={SelectStyle} 
                    options={[{value: 0 ,label:"전체"}, ...categoryOptions]}
                    defaultValue={selectedCategory.defaultValue}    
                    value={selectedCategory.option}
                    onChange={selectedCategory.handleOnChange}
                />
                <Select 
                    styles={SelectStyle} 
                    options={searchTypeOptions}
                    defaultValue={selectedSearchType.defaultValue}
                    value={selectedSearchType.option}
                    onChange={selectedSearchType.handleOnChange}
                />
                <input type="text" 
                    css={s.searchInput}
                    value={searchText.value}
                    onChange={searchText.handleOnChange}
                    onKeyDown={searchText.handleOnKeyDown}
                />
                <button css={s.searchButton} onClick={searchSubmit}>검색</button>
            </div>
            <div css={s.tableLayout}>
                <table css={s.table}>
                    <thead>
                        <tr css={s.theadTr}>
                            <th><input type="checkbox" onChange={(e) => handleAllCheckOnChange(e)} ref={checkBoxRef} /></th>
                            <th>코드번호</th>
                            <th>도서명</th>
                            <th>저자명</th>
                            <th>출판사</th>
                            <th>ISBN</th>
                            <th>도서형식</th>
                            <th>카테고리</th>
                            <th>표지URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookList.map(book => 
                                <tr key={book.bookId}>
                                    <td><input type="checkbox" value={book.bookId} checked={book.checked} onChange={handleCheckOnChange} /></td>
                                    <td>{book.bookId}</td>
                                    <td>{book.bookName}</td>
                                    <td>{book.authorName}</td>
                                    <td>{book.publisherName}</td>
                                    <td>{book.isbn}</td>
                                    <td>{book.bookTypeName}</td>
                                    <td>{book.categoryName}</td>
                                    <td>{book.coverImgUrl}</td>
                                </tr>
                            )
                        }
                        
                    </tbody>
                </table>
            </div>
            <div>
                {
                    !getBookCountQuery.isLoading  &&
                    <AdminSearchPageNumbers bookCount={getBookCountQuery.data?.data} />
                }
            </div>
        </div>
    );
}

export default AdminBookSearch;