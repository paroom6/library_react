import React, { useCallback, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import {HiMenu} from "react-icons/hi";
import * as s from "./style";
import { useRecoilState } from 'recoil';
import { menuState } from '../../atoms/menuAtoms';
import { Link } from 'react-router-dom';
import { FiUser } from "react-icons/fi";
import { principalState } from '../../atoms/principalAtom';

function RootHeader(props) {
    const [show, setShow] = useRecoilState(menuState);
    const [ principal, setPrincipal ] = useRecoilState(principalState);
    
    const handleOpenMenuClick = () => {
        setShow(() => true);
    }
    return (
        <div css={s.header}>
            <button css={s.menuButton} onClick={() => handleOpenMenuClick()}>
                <HiMenu/>
            </button>
            {
                !principal ? 
                <Link css={s.account} to={"/auth/signin"}>
                    <FiUser />
                </Link>
                : <Link css={s.account} to={"/account/mypage"}>
                    <FiUser />
                </Link>
            }
            
        </div>
    );
}

export default RootHeader;