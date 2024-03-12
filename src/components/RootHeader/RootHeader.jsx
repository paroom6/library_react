import React from 'react';
/** @jsxImportSource @emotion/react */
import {HiMenu} from "react-icons/hi";
import * as s from "./style";
import { useRecoilState } from 'recoil';
import { menuState } from '../../atoms/menuAtoms';

function RootHeader(props) {
    const [show, setShow] = useRecoilState(menuState);
    const handleOpenMenuClick = () => {
        setShow(true);
        console.log(show);
    }
    return (
        <div css={s.header}>
            <button css={s.menuButton} onClick={() => handleOpenMenuClick()}>
                <HiMenu/>
            </button>
        </div>
    );
}

export default RootHeader;