import React, { useCallback, useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {HiMenu} from "react-icons/hi";
import * as s from "./style";
import { useRecoilState } from 'recoil';
import { menuState } from '../../atoms/menuAtoms';
import { Link } from 'react-router-dom';
import { FiLogOut, FiUser } from "react-icons/fi";
import { useQueryClient } from 'react-query';
import instance from '../../apis/utils/instance';

function RootHeader(props) {
    const [show, setShow] = useRecoilState(menuState);
    const [isLogin, setLogin] = useState(false);
    const queryClient = useQueryClient();
    // const principal = queryClient.getQueryData("principalQuery");
    const principalState = queryClient.getQueryState("principalQuery");
    
    useEffect(() => {
        setLogin(() => principalState.status === "success");
        console.log(principalState.status);
    },[principalState.status])

    const handleOpenMenuClick = (e) => {
        e.stopPropagation();
        setShow(() => true);
    }

    const handleRefetch = () => {
        queryClient.refetchQueries("principalQuery");
    }

    const handleLogoutClick = () => {
        localStorage.removeItem("AccessToken");
        instance.interceptors.request.use((config) => {
            config.headers.Authorization = null;
            return config;
        });
        queryClient.refetchQueries("principalQuery");
    }
    return (
        <div css={s.header}>
            <button css={s.menuButton} onClick={(e) => handleOpenMenuClick(e)}>
                <HiMenu/>
            </button>
            <button onClick={handleRefetch}>principal reload</button>
            {
                !isLogin ? 
                <Link css={s.account} to={"/auth/signin"}>
                    <FiUser />
                </Link>
                : <div css={s.accountItems}>
                    <button css={s.logout} onClick={handleLogoutClick}>
                        <FiLogOut />
                    </button> 
                <Link css={s.account} to={"/account/mypage"}>
                    <FiUser />
                </Link>
                </div> 
            }
            
        </div>
    );
}

export default RootHeader;