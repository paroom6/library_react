/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React from 'react';
import AuthPageInput from '../../components/AuthPageInput/AuthPageInput';
import RightTopButton from '../../components/RightTopButton/RightTopButton';
import { useInput } from "../../hooks/useInput";
import axios from "axios";

function SignUpPage(props) {
    const [username, setUsername, userNameChange] = useInput();
    const [password, setPassword, passwordChange] = useInput();
    const [checkPassword, setCheckPassword, checkPasswordChange] = useInput();
    const [name, setName, nameChange] = useInput();
    const [email, setEmail, emailChange] = useInput();
    const handleSignupSubmit = () => {
        const signupData = {
            username,
            password,
            checkPassword,
            name,
            email
        }
        signupRequest(signupData);
    }
    const signupRequest = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/auth/signup",data);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    const testErrorMessage = {
        type: "error",
        text: "이미 등록된 사용자이름입니다."

    }
    const testSuccessMessage = {
        type: "success",
        text: "사용가능한 비밀번호입니다."

    }
    return (
        <>
            <div css={s.header}>
                <h1>회원가입</h1>
                <RightTopButton onClick={handleSignupSubmit}>가입하기</RightTopButton>
            </div>
            <AuthPageInput type={"text"} name={"username"} placeholder={"사용자이름"} value={username} onChange={userNameChange}/>
            <AuthPageInput type={"password"} name={"password"} placeholder={"비밀번호"} value={password} onChange={passwordChange}/>
            <AuthPageInput type={"password"} name={"checkPassword"} placeholder={"비밀번호 확인"} value={checkPassword} onChange={checkPasswordChange}/>
            <AuthPageInput type={"text"} name={"name"} placeholder={"성명"} value={name} onChange={nameChange}/>
            <AuthPageInput type={"text"} name={"email"} placeholder={"이메일"} value={email} onChange={emailChange}/>
        </>
    );
}

export default SignUpPage;