import {css} from "@emotion/react";

export const inputBox = css`
    position: relative;
    box-sizing: border-box;
    margin-bottom: 10px;
    width: 100%;
`

export const input = css`
    box-sizing: border-box;
    outline: none;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    padding: 10px 30px 10px 10px;
    width: 100%;
    background-color: white;
    font-size: 14px;
    cursor: pointer;
`
export const MessageBox = (type) => css`
    padding: 5px 10px;
    color: ${type === 'error' ? "#ff6161" : "#63ff80"};
    font-size: 11px;
    font-weight: 600;
`
export const inputIcon = (type) => css`
    position: absolute;
    top: 10px;
    right: 10px;
    color: ${type === 'error' ? "#ff6161" : "#63ff80"};

`