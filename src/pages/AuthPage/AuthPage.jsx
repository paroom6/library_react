/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUpPage from "../SignUpPage/SignUpPage";
import SigninPage from "../SigninPage/SigninPage";

function AuthPage(props) {
    return (
        <div css={s.layout}>
            <Routes>
                <Route path='/signin' element={<SigninPage/>}/>
                <Route path='/signup' element={<SignUpPage/>}/>
                <Route path='/signin/oauth'/>
            </Routes>
        </div>
    );
}

export default AuthPage;