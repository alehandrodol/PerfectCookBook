import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



export default function Landing() {

    const navigate = useNavigate();
    //Проверяем залогинен ли пользователь. Если нет, то редиректим его на главную страницу.
    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            navigate("/")
        }
    }, []);
    



    return (<div>БЛЮДА</div>)
}