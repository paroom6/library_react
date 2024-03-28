/** @jsxImportSource @emotion/react */
import Select from "react-select";
import * as s from "./style";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect, useRef, useState } from "react";
import { useReactSelect } from "../../hooks/useReactSelect";
import { useBookRegisterInput } from "../../hooks/useBookRegisterInput";
import { deleteBooksRequest, getBookCountRequest, searchBooksRequest } from "../../apis/api/bookApi";
import { useSearchParams } from "react-router-dom";
import AdminSearchPageNumbers from "../AdminSearchPageNumbers/AdminSearchPageNumbers";
import { useRecoilState } from "recoil";
import { selectedBookState } from "../../atoms/adminSelectedBookAtom";

function AdminBookSearch({ selectStyle, bookTypeOptions, categoryOptions, isDelete, setIsDelete}) {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const searchCount = 20;
    const [ bookList, setBookList ] = useState([]);
    const [ checkAll, setCheckAll ] = useState({
        checked: false,
        target: 1 // 1 => 전체 선택 2 => 부분 선택
    });
    
    const [ lastCheckBookId, setLastCheckBookId ] = useState();
    const [ selectedBook, setSelectedBook ] = useRecoilState(selectedBookState);
    const searchBooksQuery = useQuery(
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
                setBookList(() => response.data.map(book => {
                    return {
                        ...book,
                        checked: false
                    }
                }));
            }
        }
    );

    const getBookCountQuery = useQuery(
        ["getBookCountQuery", searchBooksQuery.data],
        async () => await getBookCountRequest({
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
            }
        }
    );

    const deleteBooksMutation = useMutation({
        mutationKey: "deleteBooksMutation",
        mutationFn: deleteBooksRequest,
        onSuccess: response => {
            alert("삭제완료.");
            window.location.replace("/admin/book/management?page=1");
        },
        onError: error =>{}
    })
    useEffect(() => {
        if(isDelete) {
            const deleteBooks = bookList.filter(book => book.checked).map(book => book.bookId);
            deleteBooksMutation.mutate(deleteBooks);
        }
        setIsDelete(() => false);
    },[isDelete])

    const searchSubmit = () => {
        setSearchParams({
            page: 1
        })
        searchBooksQuery.refetch();
    }

    const selectedBookType = useReactSelect({value: 0, label: "전체"});
    const selectedCategory = useReactSelect({value: 0, label: "전체"});
    const selectedSearchType = useReactSelect({value: 0, label: "전체"});
    const searchText = useBookRegisterInput(searchSubmit);

    const searchTypeOptions = [
        {value: 0, label: "전체"},
        {value: 1, label: "도서명"},
        {value: 2, label: "저자명"},
        {value: 3, label: "출판사"},
        {value: 4, label: "ISBN"},
    ];

    const selectStyle2 = {
        control: baseStyles => ({
            ...baseStyles,
            borderRadius: "0px",
            border: "none",
            borderRight: "1px solid #dbdbdb",
            outline: "none",
            boxShadow: "none"
        })
    }
    useEffect(() => {
        if(checkAll.target === 1) {
            setBookList(() => 
            bookList.map(book => {
                return{
                    ...book,
                    checked: checkAll.checked
                }
            }))
        }
    },[checkAll])
    const handleCheckAllOnChange = (e) => {
        setCheckAll(() => {
            return{
                checked: e.target.checked,
                target: 1
            }
        })
    }
    useEffect(() => {
        const findCount = bookList.filter(book => book.checked === false).length;
        if(findCount === 0) {
            setCheckAll(() => {
                return{
                    checked: true,
                    target: 2
                }
            })
        } else {
            setCheckAll(() => {
                return{
                    checked: false,
                    target: 2
                }
            })
        }
    }, [bookList])
    useEffect(() => {
        let lastSelectedBook = {...selectedBook};
        let checkStatus = false;
        lastSelectedBook = bookList.filter(book => book.bookId === lastCheckBookId && book.checked)[0];
        if(!lastSelectedBook) {
            for (const book of bookList) {
                if(book.checked) {
                    lastSelectedBook = book;
                }
            }
        }
        if(!!lastSelectedBook) {
            checkStatus = true;
        }
        if(!checkStatus) {
            setSelectedBook(() => ({
                bookId: 0,
                isbn: "",
                bookTypeId: 0,
                bookTypeName: "",
                categoryId: 0,
                categoryName: "",
                bookName: "",
                authorName: "",
                publisherName: "",
                coverImgUrl: ""
            }));
        }else {
            setSelectedBook(() => lastSelectedBook);
        }
    },[bookList])
    const handleCheckOnChange = (e) => {
        const bookId = parseInt(e.target.value);
        setBookList(() => bookList.map(book => {
            if(book.bookId === bookId) {
                return {
                    ...book,
                    checked: e.target.checked
                }
            } else {
                return book
            }
        }))
        setLastCheckBookId(() => bookId);
    }

    return (
        <div>
            <div css={s.searchBar}>
                <Select 
                    styles={selectStyle2} 
                    options={[{value: 0, label: "전체"}, ...bookTypeOptions]}
                    defaultValue={selectedBookType.defaultValue}
                    value={selectedBookType.option}
                    onChange={selectedBookType.handleOnChange}
                />
                <Select 
                    styles={selectStyle2} 
                    options={[{value: 0, label: "전체"}, ...categoryOptions]}
                    defaultValue={selectedCategory.defaultValue}
                    value={selectedCategory.option}
                    onChange={selectedCategory.handleOnChange}
                />
                <Select 
                    styles={selectStyle} 
                    options={searchTypeOptions}
                    defaultValue={selectedSearchType.defaultValue}
                    value={selectedSearchType.option}
                    onChange={selectedSearchType.handleOnChange}
                />
                <input 
                    css={s.searchInput} 
                    type="text" 
                    value={searchText.value}
                    onChange={searchText.handleOnChange}
                    onKeyDown={searchText.handleOnKeyDown}
                />
                <button css={s.searchButton} onClick={() => searchSubmit()}>검색</button>
            </div>
            <div css={s.tableLayout}>
                <table css={s.table}>
                    <thead>
                        <tr css={s.theadTr}>
                            <th><input type="checkbox" checked={checkAll.checked} onChange={handleCheckAllOnChange}/></th>
                            <th>코드번호</th>
                            <th>도서명</th>
                            <th>저자명</th>
                            <th>출판사명</th>
                            <th>ISBN</th>
                            <th>도서형식</th>
                            <th>카테고리</th>
                            <th>표지URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookList.map(
                                (book) => 
                                <tr key={book.bookId}>
                                    <td><input type="checkbox" value={book.bookId} checked={book.checked} onChange={handleCheckOnChange}/></td>
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
            {
               !getBookCountQuery.isLoading &&
               <AdminSearchPageNumbers bookCount={getBookCountQuery.data?.data}/>
            }
        </div>
    );
}

export default AdminBookSearch;