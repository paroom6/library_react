/** @jsxImportSource @emotion/react */

import React from 'react';
import * as s from "./style";
import { HiMenu } from 'react-icons/hi';
import { useRecoilState } from 'recoil';
import { menuState } from '../../atoms/menuAtoms';
import { Link } from 'react-router-dom';

function RootSideMenuLeft(props) {
    const [show, setShow] = useRecoilState(menuState);
    const handleCloseMenuClick = () => {
        setShow(false);
    }
    return (
        <div css={s.layout(show)}>
            <div css={s.header}>
                <button css={s.menuButton} onClick={() => handleCloseMenuClick()}>
                    <HiMenu/>
                </button>
            </div>
            <div css={s.profile}>

            </div>
            <div css={s.menuList}>
                <Link css={s.menuLink}>도서검색</Link>
            </div>
        </div>
    );
}

export default RootSideMenuLeft;