import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function OAuth2SigninPage(props) {
    const [ searchParams ] = useSearchParams();
    const accessToken = searchParams.get("accessToken");
    useEffect(() => {
        localStorage.setItem("AccessToken", accessToken);
        window.location.replace("/");
    },[])
    return (
        <> 
        </>
    );
}

export default OAuth2SigninPage;