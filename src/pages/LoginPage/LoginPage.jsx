import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css";
import ContactUs from '../components/ContactUs/ContactUs';
import AvionbankLogo from "../components/AvionbankLogo/AvionbankLogo";
import LoginCredentials from "./components/LoginCredentials";
// import loginCredentialsArray from "../../assets/data/loginCredentials.json";


function LoginPage(props) {
    const { loginCredentials, findUserName, userName } = props;
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!localStorage.getItem('currentUserNameLoggedin')) {
            navigate("/loginpage");
        }else{
            navigate('/mainpage')
        }
    }, [navigate, userName]);

    return (
        <div className="loginPage">
            <AvionbankLogo />
            <LoginCredentials loginCredentials={loginCredentials} findUserName={findUserName}/>
            <ContactUs />
        </div>
    );
}

export default LoginPage;
