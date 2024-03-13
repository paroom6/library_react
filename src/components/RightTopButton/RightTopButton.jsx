/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React from 'react';
function RightTopButton({children, onClick}) {
    return (
        <button css={s.button} onClick={onClick}>{children}</button>
    );
}

export default RightTopButton;