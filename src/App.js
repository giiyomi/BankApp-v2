import './App.css';
import MainPage from './pages/MainPage/MainPage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import loginCredentialsArray from './assets/data/loginCredentials.json';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  const [loginCredentials, setNewCredentials] = useState(() => {
    const storedCredentials = JSON.parse(localStorage.getItem('loginCredentials'));
    return Array.isArray(storedCredentials) ? storedCredentials : loginCredentialsArray;
  });
  const [userName, findUserName] = useState(localStorage.getItem('currentUserNameLoggedin'));
  const findUserArray = loginCredentials.find(credential => credential.user_name === userName);
  const accountUserCredentials = findUserArray?.acc_users || [];

  useEffect(() => {
    localStorage.setItem('loginCredentials', JSON.stringify(loginCredentials));
    localStorage.setItem('currentLoggedinAccount', JSON.stringify(findUserArray))
  }, [loginCredentials, findUserArray]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path='/loginpage'
            element={
              <LoginPage
                loginCredentials={loginCredentials}
                findUserName={findUserName}
                userName={userName}
              />
            }
          />
          <Route path='/signuppage' 
            element={
              <SignupPage
                setNewCredentials = {setNewCredentials}
                newId={loginCredentials.length}
                loginCredentials={loginCredentials}
              />
            }
          />
          <Route path='/mainpage' 
            element={
              <MainPage
                loginCredentials={loginCredentials}
                userName={userName}
                findUserArray={findUserArray}
                setAccUserId={accountUserCredentials.length}
                accountUserCredentials={accountUserCredentials}
                setNewCredentials={setNewCredentials}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
