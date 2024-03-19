/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React from 'react';

function PageContainer({ children }) {
    return (
        <div css={s.container}>
            {children}
        </div>
    );
}

export default PageContainer;