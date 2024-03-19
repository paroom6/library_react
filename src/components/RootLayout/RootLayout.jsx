/** @jsxImportSource @emotion/react */

import { useRecoilState } from "recoil";
import { menuState } from "../../atoms/menuAtoms";
import * as s from "./style";

function RootLayout({children}) {
    const [show, setShow] = useRecoilState(menuState);
    const handleBackgroundClick = (e) => {//이벤트예외처리
        setShow(() => false);
    }
    return (
        <>
            <div css={s.background}>
                <div css={s.layout} onClick={handleBackgroundClick}>
                    {children}
                </div>
            </div>
        </>
    );
}

export default RootLayout;