/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import AuthPageInput from '../../components/AuthPageInput/AuthPageInput';
import RightTopButton from '../../components/RightTopButton/RightTopButton';
import { useInput } from "../../hooks/useInput";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OAuth2SignupRequest } from "../../apis/api/signup";
import { useMutation } from "react-query";

function OAuth2SignupPage(props) {
    const navigate = useNavigate();
    const [ username,  userNameChange, usernameMessage,setUsername, setUsernameMessage ] = useInput("username");
    const [ password, passwordChange, passwordMessage] = useInput("password");
    const [ checkPassword,  checkPasswordChange ] = useInput("checkPassword");
    const [ name ,nameChange ,nameMessage] = useInput("name");
    const [ email, emailChange, emailMessage] = useInput("email");
    const [checkPasswordMessage, setCheckPasswordMessage ] =useState(null);
    const [ searchParams ] = useSearchParams();
    const oAuth2SignuoMutation = useMutation({
        mutationKey: "oAuth2SignuoMutation",
        mutationFn: OAuth2SignupRequest,
        onSuccess: response => {
            navigate("/auth/signin");
        },
        onError: error => {
            if(error.response.status === 400) {
                const errorMap = error.response.data;
                const errorEntries = Object.entries(errorMap);
                for (const [k, v] of errorEntries) {
                    if("username" === k) {
                        setUsernameMessage(() => {
                            return{
                                type: "error" ,
                                text: v
                            }
                        })
                    }
                } 
            }
        }
    });
    
    useEffect(() => {
        if(!checkPassword || !password) {
            setCheckPasswordMessage(() => null);
            return;
        }
        if(checkPassword === password) {
            setCheckPasswordMessage(() => {
                return{
                    type: "success",
                    text: ""
                }
            })
        }else {
            setCheckPasswordMessage(() => {
                return{
                    type: "error",
                    text: "비밀번호가 일치하지 않습니다."
                }
            })
        }
    },[checkPassword])
    const handleSignupSubmit = () =>{
        const checkFlags = [
            usernameMessage?.type,
            passwordMessage?.type,
            checkPasswordMessage?.type,
            nameMessage?.type,
            emailMessage?.type    
        ];
        console.log({
            username,
            password,
            name,
            email,
            oauth2Name: searchParams.get("name"),
            providerName: searchParams.get("provider")
        });
        if(checkFlags.includes("error") || checkFlags.includes(undefined)) {
            alert("가입정보를 다시 확인하세요.");
            return;
        }
        console.log(checkFlags);
        oAuth2SignuoMutation.mutate({
            username,
            password,
            name,
            email,
            oauth2Name: searchParams.get("name"),
            providerName: searchParams.get("provider")
        });
    }
   
    
    return (
        <>
            <div css={s.header}>
                <h2>회원가입({searchParams.get("provider")})</h2>
                <RightTopButton onClick={handleSignupSubmit}>가입하기</RightTopButton>
            </div>
            <AuthPageInput type={"text"} name={"username"} placeholder={"사용자이름"} value={username} onChange={userNameChange} Message={usernameMessage} />
            <AuthPageInput type={"password"} name={"password"} placeholder={"비밀번호"} value={password} onChange={passwordChange} Message={passwordMessage}/>
            <AuthPageInput type={"password"} name={"checkPassword"} placeholder={"비밀번호 확인"} value={checkPassword} onChange={checkPasswordChange} Message={checkPasswordMessage}/>
            <AuthPageInput type={"text"} name={"name"} placeholder={"성명"} value={name} onChange={nameChange} Message={nameMessage}/>
            <AuthPageInput type={"text"} name={"email"} placeholder={"이메일"} value={email} onChange={emailChange} Message={emailMessage}/>
        </>
    );
}

export default OAuth2SignupPage;