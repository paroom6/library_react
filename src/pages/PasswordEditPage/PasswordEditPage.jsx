import React from 'react';
import AuthPageInput from '../../components/AuthPageInput/AuthPageInput';
import { useInput } from '../../hooks/useInput';
import { useMutation } from 'react-query';
import { editPasswordRequest } from '../../apis/api/editPassword';

function PasswordEditPage(props) {
    const [ oldPassword, handleOldPassword, oldMessage, setOldPassword, setOldMessage ] = useInput("oldPassword");
    const [ newPassword, handleNewPassword, newMessage, setNewPassword, setNewMessage ] = useInput("newPassword");
    const [ newPasswordCheck, handleNewPasswordCheck, newCheck, setNewCheck, setNewCheckMessage ] = useInput("newPasswordCheck");
    const editPasswordMutation = useMutation({
        mutationKey: "editPasswordMutation",
        mutationFn: editPasswordRequest,
        onSuccess:(response) => {
            alert("비밀번호를 정상적으로 수정하였습니다. \n다시 로그인 하세요.");
            localStorage.removeItem("AccessToken");
            window.location.replace("/auth/signin");
        },
        onError: error => {
            console.log("bf if");
            if(error.response.status === 400) {
                const errorMap = error.response.data;
                const errorEntries = Object.entries(errorMap);
                setOldMessage(null);
                setNewMessage(null);
                setNewCheckMessage(null);
                console.log("work");
                for(let[ k, v ] of errorEntries) {
                    const message = {
                        type: "error",
                        text: v
                    }
                    if(k === "oldPassword") {
                        setOldMessage(() => message)
                    }
                    if(k === "newPassword") {
                        setNewMessage(() => message)
                    } 
                    if(k === "newCheck") {
                        setNewCheckMessage(() => message)
                    } 
                    console.log(message);
                }
            }
        }
    });
    const handleEditSubmitClick = () => {
        editPasswordMutation.mutate({
            oldPassword,
            newPassword,
            newCheck
        });
    }
    return (
        <div>
            <h1>비밀번호 변경</h1>        
            <AuthPageInput type={"password"} value={oldPassword} onChange = {handleOldPassword} placeholder={"현재 비밀번호를 입력하세요"} Message={oldMessage}/>
            <AuthPageInput type={"password"} value={newPassword} onChange = {handleNewPassword} placeholder={"새로운 비밀번호를 입력하세요"} Message={newMessage}/>
            <AuthPageInput type={"password"} value={newPasswordCheck} onChange = {handleNewPasswordCheck} placeholder={"새로운 비밀번호를 확인하세요"} Message={newCheck}/>
            <button onClick={handleEditSubmitClick}>비밀번호 변경하기</button>
        </div>
    );
}

export default PasswordEditPage;