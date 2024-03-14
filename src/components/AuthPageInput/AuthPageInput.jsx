/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React from 'react';
import { MdCheckCircleOutline, MdErrorOutline } from "react-icons/md";

function AuthPageInput({type, name, placeholder, value, onChange, onBlur, ref,Message}) {
    return (
        <div css={s.inputBox}>
            <input 
                css={s.input}
                type={type} 
                name={name} 
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}/>
            {
                !!Message && 
                <div css={s.inputIcon(Message.type)}>
                    {Message.type === "error" ? <MdErrorOutline /> : <MdCheckCircleOutline />}
                </div>


            }
            {
                !!Message && 
                <div css={s.MessageBox(Message.type)}>
                    {Message.text}
                </div>
            }
            
        </div>
    );
}

export default AuthPageInput;