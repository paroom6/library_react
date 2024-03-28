/** @jsxImportSource @emotion/react */
import React from 'react';
import {css} from "@emotion/react";

const inputBox = css`
    box-sizing: border-box;
    border: none;
    outline: none;
    padding: 0px 10px;
    width: 100%;
    height: 100%;
    &:disabled{
        background-color: white;
    }
`


function BookRegiserInout({value, bookRef, onChange, onKeyDown, isDisable}) {
    return (
        <>
        <input 
            css={inputBox}
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            ref={bookRef}
            disabled={isDisable}
         />
        </>
    );
}

export default BookRegiserInout;