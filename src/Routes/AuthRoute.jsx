import React, { useCallback, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { principalState } from '../atoms/principalAtom';
import { getPrincipalRequest } from '../apis/api/principal';
import AuthPage from '../pages/AuthPage/AuthPage';
import Homepage from '../pages/HomePage/Homepage';
import { useQuery } from 'react-query';
import RootHeader from '../components/RootHeader/RootHeader';
import RootSideMenuLeft from '../components/RootSideMenuLeft/RootSideMenuLeft';
import FullSizeLoader from '../components/FullSizeLoader/FullSizeLoader';
import PageContainer from '../components/PageContainer/PageContainer';
import MyPage from '../pages/MyPage/MyPage';
import PasswordEditPage from '../pages/PasswordEditPage/PasswordEditPage';
//useQuery: get 요청에 사용
//첫번째 매개변수: 배열["key값", dependency] 
//두번째 매개변수: 요청메서드(async, await)
// 세번째 매개변수: 옵션객체({
//     retry: 0,
//     refetchOnWindowFocus: false,
//     onSuccess: 함수,
//     onError: 함수,
//     enabled: true or false
// } )
function AuthRoute(props) {
    const principalQuery = useQuery(["principalQuery"], getPrincipalRequest,{//focus 변경정로도
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: response => {
            console.log("onSuccess");
            
        },
        onError: error => {
            console.log("오류");
            console.log(error);
        }
    });


    return (
        <>  
            <RootHeader />
            <RootSideMenuLeft />
            <PageContainer>
                {
                    principalQuery.isLoading 
                    ?<FullSizeLoader size={20} />
                    :<Routes>
                        <Route path="/auth/*" element={ <AuthPage />}/>
                        <Route path="/" element={ <Homepage/>}/>     
                        <Route path="/account/mypage" element={ <MyPage/>}/>     
                        <Route path="/account/edit/password" element={ <PasswordEditPage/>}/>     
                    </Routes>
                }
            </PageContainer>
        </>
    );
}

export default AuthRoute;