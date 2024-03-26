/** @jsxImportSource @emotion/react */
import Select from "react-select";
import * as s from "./style";
import React, { useState } from 'react';
import { useQuery } from "react-query";
import { useReactSelect } from "../../hooks/useReactSelect";
import { useBookRegisterInput } from "../../hooks/useBookRegisterInput";
import { searchBookRequest } from "../../apis/api/bookApi";
import { useSearchParams } from "react-router-dom";

function AdminBookSearch({ SelectStyle,bookTypeOptions, categoryOptions}) {
    const [ searchParams ] = useSearchParams();
    const searchCount = 20;
    const searchBookQuery = useQuery(
        ["searchBooksQuery", searchParams.get("page")],
        async () => await searchBookRequest({
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
            },
            
        }
    )

    const searchSubmit = () => {
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
            <div css={s.tableLayer}>
                <table css={s.table}>
                    <thead>
                        <tr css={s.theadTr}>
                            <th><input type="checkbox" /></th>
                            <th>코드번호</th>
                            <th>도서명</th>
                            <th>저자명</th>
                            <th>출판사</th>
                            <th>ISBN</th>
                            <th>도서형식</th>
                            <th>카테고리</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox" name="" id="" /></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>

            </div>
        </div>
    );
}

export default AdminBookSearch;