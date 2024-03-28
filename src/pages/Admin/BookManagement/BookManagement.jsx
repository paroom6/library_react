/** @jsxImportSource @emotion/react */
import Select from "react-select";
import BookRegiserInout from "./BookRegiserInout/BookRegiserInout";
import * as s from "./style";
import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from "react-query";
import { getAllBookTypeRequest, getAllCategoryRequest } from "../../../apis/api/options";
import { CiSquarePlus } from "react-icons/ci";
import { useBookRegisterInput } from "../../../hooks/useBookRegisterInput";
import { storage } from "../../../apis/filrebase/config/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {v4 as uuid} from "uuid";
import { Snapshot, useRecoilState, useSetRecoilState } from "recoil";
import RightTopButton from "../../../components/RightTopButton/RightTopButton";
import { registerBook, updateBookRequest, updateBooksRequest } from "../../../apis/api/bookApi";
import AdminBookSearch from "../../../components/AdminBookSearch/AdminBookSearch";
import { selectedBookState } from "../../../atoms/adminSelectedBookAtom";
const selectStyle = {
    control: (baseStyles) => ({
        ...baseStyles,
        borderRadius: "0px",
        border: "none",
        outline: "none",
        boxShadow: "none"
    })
}
const selectStyle2 = {
    control: (baseStyles) => ({
        ...baseStyles,
        borderRadius: "0px",
        border: "none",
        borderRight: "1px solid #dbdbdb",
        outline: "none",
        boxShadow: "none"
    })
}

function BookManagement(props) {
    const [ bookTypesOption, setBookTypesOption ] = useState([]);
    const [ categoriesOption, setCategoriesOption ] = useState([]);
    const [ actionStatus, setActionStatus ] = useState(0); // 0 = 선택, 1 = 추가, 2 = 수정 3 = 삭제
    const [ isDelete, setIsDelete ] = useState(false);
    const fileRef = useRef();
    const inputRef = [
        useRef(),//0bookId
        useRef(),//1isbn
        useRef(),//2형식
        useRef(),//3카테고리
        useRef(),//4도서명
        useRef(),//5저자명
        useRef(),//6출판사
        useRef() //7Url
    ];

    const registerBookMutation = useMutation({
        mutationKey: "registerBookMutation",
        mutationFn: registerBook,
        onSuccess:() =>{
            alert("추가완료.");
            window.location.replace("/admin/book/management?page=1");
        },
        onError:() =>{}
    })
    
    const categoryQuery = useQuery(
        ["categoryQuery"],
        getAllCategoryRequest,
        {
            onSuccess: response => {
                setCategoriesOption(() => response.data.map( category => {
                    return{
                        value: category.categoryId,
                        label: category.categoryName
                        
                    }
                }));
            },
            retry: 0,
            refetchOnWindowFocus: false
    });

    const bookTypeQuery = useQuery(
        ["bookTypeQuery"],
        getAllBookTypeRequest,
        {
            onSuccess: response => {
                setBookTypesOption(() => response.data.map( bookType => {
                    return{
                        value: bookType.bookTypeId,
                        label: bookType.bookTypeName
                    }
                }));
            },
            retry: 0,
            refetchOnWindowFocus: false
    });
    const nextInput = (ref) => {
        console.log(ref)
        ref.current.focus();
    }
    const updateBookMutation = useMutation({
        mutationKey: "updateBookMutation",
        mutationFn: updateBookRequest,
        onSuccess: response => {
            console.log(response);
            alert("수정완료.");
            window.location.reload();
        },
        onError: error => {}
    })
    const submit = () => {
        if(actionStatus === 1){
            registerBookMutation.mutate({
                isbn: isbn.value,
                bookTypeId: bookTypeId.value.value,
                categoryId: categoryId.value.value,
                bookName: bookName.value,
                authorName: authorName.value,
                publisherName: publisherName.value,
                coverImgUrl: imgUrl.value
            });
        } else if(actionStatus === 2) {
            
            updateBookMutation.mutate({
                bookId: bookId.value,
                bookName: bookName.value,
                authorName: authorName.value,
                publisherName: publisherName.value,
                isbn: isbn.value,
                bookTypeId: bookTypeId.value.value,
                categoryId: categoryId.value.value,
                coverImgUrl: imgUrl.value
            })
        } else if(actionStatus === 3) {
            setIsDelete(() => true);
        }
        cancel();
    }
    const cancel = () => {
        bookId.setValue(() => 0);
        isbn.setValue(() => "");
        bookTypeId.setValue(() => null);
        categoryId.setValue(() => null);
        bookName.setValue(() => "");
        authorName.setValue(() => "");
        publisherName.setValue(() => "");
        imgUrl.setValue(() => "");
        setActionStatus(() => 0);

    }
    const bookId = useBookRegisterInput(nextInput, inputRef[1]);
    const isbn = useBookRegisterInput(nextInput, inputRef[2]);
    const bookTypeId = useBookRegisterInput(nextInput, inputRef[3]);
    const categoryId = useBookRegisterInput(nextInput, inputRef[4]);
    const bookName = useBookRegisterInput(nextInput, inputRef[5]);
    const authorName = useBookRegisterInput(nextInput, inputRef[6]);
    const publisherName = useBookRegisterInput(nextInput, inputRef[7]);
    const imgUrl = useBookRegisterInput(submit);
    const [ selectedBook ] = useRecoilState(selectedBookState)
    useEffect(() => {
        bookId.setValue(() => selectedBook.bookId);
        isbn.setValue(() => selectedBook.isbn);
        bookTypeId.setValue(() => ({value: selectedBook.bookTypeId, label: selectedBook.bookTypeName}));
        categoryId.setValue(() => ({value: selectedBook.categoryId, label: selectedBook.categoryName}));
        bookName.setValue(() => selectedBook.bookName);
        authorName.setValue(() => selectedBook.authorName);
        publisherName.setValue(() => selectedBook.publisherName);
        imgUrl.setValue(() => selectedBook.coverImgUrl);
    },[selectedBook])
    
    
    const handlefileChange = (e) => {
        const files = Array.from(e.target.files);
        if(files.length === 0) {
            e.target.value = "";
            return;
        }
        if(!window.confirm("파일을 업로드 하시겠습니까?")) {
            e.target.value = "";
            return;
        }
        const storageRef = ref(storage, `library/book/cover/${uuid()}_${files[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, files[0]);
        uploadTask.on(
            "state_changed",
            Snapshot => {},
            error => {},
            () => {
                alert("업로드를 완료하셨습니다.")
                getDownloadURL(storageRef)
                .then(url => {
                    imgUrl.setValue(() => url);
                });
            }
        )
    }
    return (
        <div css={s.layout}>
            <div css={s.header}>
                <h1 >도서 관리</h1>
                <div>
                    {
                        actionStatus === 0
                        ? <>
                            <RightTopButton onClick={() => setActionStatus(1)}>추가</RightTopButton>
                            <RightTopButton onClick={() => setActionStatus(2)}>수정</RightTopButton>
                            <RightTopButton onClick={() => setActionStatus(3)}>삭제</RightTopButton>
                        </>
                        :<>
                            <RightTopButton onClick={submit}>확인</RightTopButton>
                            <RightTopButton onClick={cancel}>취소</RightTopButton>
                        </>
                    }
                </div>
            </div>
            <div css={s.topLayout}>
                <table css={s.registerTable}>
                    <tbody>
                        <tr>
                            <th css={s.registerTh}>도서코드</th>
                            <td>
                                <BookRegiserInout 
                                    value={bookId.value}
                                    bookRef={inputRef[0]}
                                    onChange={bookId.handleOnChange}
                                    onKeyDown={bookId.handleOnKeyDown}
                                    isDisable={true}
                                    
                                />
                            </td>
                            <th css={s.registerTh}>ISBN</th>
                            <td>
                                <BookRegiserInout 
                                    value={isbn.value}
                                    bookRef={inputRef[1]}
                                    onChange={isbn.handleOnChange}
                                    onKeyDown={isbn.handleOnKeyDown}
                                    isDisable={![1, 2].includes(actionStatus)}
                                />
                            </td>
                            <td rowSpan={5} css={s.preview}>
                                <div css={s.imageBox}>
                                    <img src={!imgUrl.value 
                                        ? "https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-600nw-2079504220.jpg" 
                                        : imgUrl.value } alt="" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th css={s.registerTh}>도서형식</th>
                            <td>
                                <Select styles={selectStyle}
                                    value={bookTypeId.value}
                                    options={bookTypesOption}
                                    onKeyDown={bookTypeId.handleOnKeyDown}
                                    onChange={bookTypeId.handleOnChange}
                                    ref={inputRef[2]}
                                />
                            </td>
                            <th css={s.registerTh}>카테고리</th>
                            <td>
                                <Select styles={selectStyle}
                                    options={categoriesOption}
                                    value={categoryId.value}
                                    onKeyDown={categoryId.handleOnKeyDown} 
                                    onChange={categoryId.handleOnChange}
                                    ref={inputRef[3]}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th css={s.registerTh}>도서명</th>
                            <td colSpan={3}>
                                <BookRegiserInout 
                                    value={bookName.value}
                                    bookRef={inputRef[4]}
                                    onChange={bookName.handleOnChange}
                                    onKeyDown={bookName.handleOnKeyDown}
                                    isDisable={![1, 2].includes(actionStatus)}

                                />
                            </td>
                        </tr>
                        <tr>
                            <th css={s.registerTh}>저자명</th>
                            <td>
                                <BookRegiserInout 
                                    value={authorName.value}
                                    bookRef={inputRef[5]}
                                    onChange={authorName.handleOnChange}
                                    onKeyDown={authorName.handleOnKeyDown}
                                    isDisable={![1, 2].includes(actionStatus)}

                                />
                            </td>
                            <th css={s.registerTh}>출판사</th>
                            <td>
                                <BookRegiserInout 
                                    value={publisherName.value}
                                    bookRef={inputRef[6]}
                                    onChange={publisherName.handleOnChange}
                                    onKeyDown={publisherName.handleOnKeyDown}
                                    isDisable={![1, 2].includes(actionStatus)}

                                />
                            </td>
                        </tr>
                        <tr>
                            <th css={s.registerTh}>표지URL</th>
                            <td colSpan={3}>
                                <div css={s.imgUrl}>
                                    <span css={s.imgUrlBox}>
                                        <BookRegiserInout 
                                            value={imgUrl.value}
                                            bookRef={inputRef[7]}
                                            onChange={imgUrl.handleOnChange}
                                            onKeyDown={imgUrl.handleOnKeyDown}
                                            isDisable={![1, 2].includes(actionStatus)}

                                        />
                                    </span>
                                    <input type="file" 
                                        style={{
                                            display:"none"
                                        }} 
                                        onChange={handlefileChange}
                                        ref={fileRef}
                                    />
                                    <button css={s.imgAddButton} onClick={() => fileRef.current.click()} disabled={![1, 2].includes(actionStatus)}>
                                        <CiSquarePlus/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
                <AdminBookSearch 
                    SelectStyle={selectStyle2}
                    bookTypeOptions={bookTypesOption}
                    categoryOptions={categoriesOption}
                    isDelete={isDelete}
                    setIsDelete={setIsDelete}
                />
        </div>
    );
}

export default BookManagement;