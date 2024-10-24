import './LoginCredentials.css'
import { NavLink, useNavigate } from 'react-router-dom';



function LoginCredentials(props){
    const {loginCredentials,findUserName} = props
    const navigate = useNavigate (); 

    const alertLogin = (e) => {
        e.preventDefault();
        const userNameInput = e.target.elements.userName.value;
        const passwordInput = e.target.elements.password.value;
        const matchedCredential = loginCredentials.find(credential => credential.user_name === userNameInput && credential.password === passwordInput);
        
        if (matchedCredential) {
            localStorage.setItem('currentUserNameLoggedin', matchedCredential.user_name);
            alert("You have successfully logged in");
            navigate("/mainpage");
        } else {
            alert("Invalid username or password. Please try again.");
        }
    }

    return (
        <div className="loginCredentials">
            <div className="loginTitle">
                Log in to Avion Bank
            </div>
            <form className="loginForm" onSubmit={alertLogin}>
                <div className="loginInputs">
                    <input
                        type="text"
                        name="userName"
                        placeholder="Username"
                        onChange={(e) => findUserName(e.target.value)} 
                        required>
                    </input>
                    <input type="password" name="password" placeholder="Password" required></input>
                </div>
                <button type="submit" className="login">
                    <div>Log In</div>
                </button>
            </form>

            <div className="noAccount">
                <p>Don't Have an account?</p>
                <p className="noAccountSignUp"><NavLink to='/signuppage'>Sign Up</NavLink></p>
            </div>
        </div>
    )
}

export default LoginCredentials;