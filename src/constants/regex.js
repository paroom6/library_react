export const REGEX = {
    username: {
        regex: /^[A-Za-z0-9]{5,10}$/,
        text: "영문자, 숫자, 5 ~ 10자리 형식이여야 합니다." 
    },
    password: {
        regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,128}$/,
        text: "영문자, 숫자, 특수문자를 포함한 8 ~ 128자리 형식이여야 합니다." 
    },
    name: {
        regex: /^[ㄱ-횧]{2,10}$/,
        text: "한글문자 2 ~ 10자리 형식이여야 합니다." 
    },
    email: {
        regex: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
        text: "이메일 형식이여야 합니다." 
    }
};