import React, { useState } from 'react';

export function useBookRegisterInput(enterFn, ref) {
    const [ value, setValue ] = useState("");
    const handleOnChange = (e) => {
        if(!!e.target) {
            setValue(() => e.target.value);
        } else {
            console.log(e);
            setValue(() => e);
        }
    }

    const handleOnKeyDown = (e) => {
        console.log(e.keyCode);
        if(e.keyCode === 13) {
            enterFn(ref);
        } 
    } 
    return { value , handleOnChange, handleOnKeyDown, setValue }
}