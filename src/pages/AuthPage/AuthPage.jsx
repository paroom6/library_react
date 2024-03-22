/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUpPage from "../SignUpPage/SignUpPage";
import SigninPage from "../SigninPage/SigninPage";
import OAuth2Page from "../OAuth2Page/OAuth2Page";
import OAuth2SignupPage from "../OAuth2SignupPage/OAuth2SignupPage";
import OAuth2SigninPage from "../OAuth2SigninPage/OAuth2SigninPage";
import { principalState } from "../../atoms/principalAtom";
import { useQueryClient } from "react-query";
import OAuth2MergePage from "../OAuth2MergePage/OAuth2MergePage";

function AuthPage(props) {
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    // useEffect(() => {
    //     if(!!principalData) {
    //         alert("잘못된 접근입니다.");
    //         window.location.replace("/");
    //     }
    // }, []);
    return (
        <div css={s.layout}>
            <Routes>
                <Route path='/signin' element={<SigninPage/>}/>
                <Route path='/signup' element={<SignUpPage/>}/>
                <Route path='/oauth2' element={<OAuth2Page/>}/>
                <Route path='/oauth2/merge' element={<OAuth2MergePage/>}/>
                <Route path='/oauth2/signup' element={<OAuth2SignupPage/>}/>
                <Route path='/oauth2/signin' element={<OAuth2SigninPage/>}/>
            </Routes>
        </div>
    );
}

export default AuthPage;