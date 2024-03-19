/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from 'react';
import * as s from "./style";
import { HiMenu, HiUser } from 'react-icons/hi';
import { RiSettings4Line } from "react-icons/ri";
import { useRecoilState } from 'recoil';
import { menuState } from '../../atoms/menuAtoms';
import { Link, useNavigate } from 'react-router-dom';
import { button } from '../RightTopButton/style';
import { useQueryClient } from 'react-query';
import { FiUser } from 'react-icons/fi';

function RootSideMenuLeft(props) {
    const [ files, setFiles ] = useState([]);
    const [show, setShow] = useRecoilState(menuState);
    const [isLogin, setLogin] = useState(false);
    const queryClient = useQueryClient();
    const principalState = queryClient.getQueryState("principalQuery");
    const navigate = useNavigate();
    useEffect(() => {
        setLogin(() => principalState.status === "success");
    },[principalState.status])

    const handleCloseMenuClick = () => {
        setShow(() => false);
    }
    
    return (
        <div css={s.layout(show)} onClick={(e) => e.stopPropagation()}>
            <div css={s.header}>
                <button css={s.menuButton} onClick={() => handleCloseMenuClick()}>
                    <HiMenu/>
                </button>
            </div>
            <div css={s.profile}>
                {
                    !isLogin ?  
                    <div css={s.authButtons}>
                        <button onClick={() => navigate("/auth/signin")} >로그인</button>
                        <button onClick={() => navigate("/auth/signup")} >회원가입</button>
                    </div>
                    
                    :<>
                        <div css={s.settings}>
                            <RiSettings4Line />
                        </div>
                        <div css={s.profileBox}>
                            <div css={s.profileImg}>
                                <FiUser/>
                            </div>
                            <div css={s.usernameAndEmail}>
                                <span>{principalState.data.data.username}</span>
                                <span>{principalState.data.data.email}</span>
                            </div>
                        </div>
                    </>   
                }
            </div>
            <div css={s.menuList}>
                <Link css={s.menuLink}>도서검색</Link>
            </div>
        </div>
    );
}

export default RootSideMenuLeft;