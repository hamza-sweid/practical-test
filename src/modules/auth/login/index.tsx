import React, { useEffect, useState } from 'react';
import { validateEmail } from '../../../utils/validator';
import { Login, setIsUserLoggedIn, setUserRole } from '../../../services/auth';
import { UserAuth } from '../../../interface/login';
import Message from '../../../components/message';
import { useNavigate } from 'react-router-dom';
import style from '../../../styles/login.module.scss';

const LoginPage = (props: any) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showUser, setShowUser] = useState(false);
  const [error, setError] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate('/users');
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setShowUser(false);
    if (validateEmail(email)) {
      setShowUser(true);
      setError('');
      try {
        const users: any = await Login();
        const user: UserAuth = users.find(
          (user: UserAuth) => user.email === email && user.password === password
        );
        if (user) {
          setUserRole(user.role);
          setIsUserLoggedIn(true);
          setMessage('Login successful');
          setShowMessage(true);
          setError('');
          navigate('/users');
        } else {
          setShowMessage(true);
          setError('Invalid username or password');
          setMessage('Invalid username or password');
        }
      } catch (error) {
        setShowMessage(true);
        setError('Error fetching user data. Please try again later.');
        setMessage('Error fetching user data. Please try again later.');
      }
      return;
    } else {
      setShowMessage(true);
      setError('Email is not valid');
      setMessage('Email is not valid');
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setError('Form Reset! Enter your Details Again');
    console.log(error);
    setShowUser(false);
  };

  const disableAlert = () => {
    if (error !== '') {
      setTimeout(() => {
        setError('');
        console.log(error);
      });
    }
    if (showUser === true) {
      setTimeout(() => {
        setShowUser(false);
      });
    }
  };

  return (
    <>
      {showMessage && (
        <Message
          message={message}
          duration={2}
          status={error ? 'error' : 'success'}
          // onClose={handleCloseMessage}
        />
      )}
      <div className={style.login}>
        <div className={style.authContainer}>
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                type="email"
                name="email"
                id="email"
                data-testid="email"
                onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
                autoComplete="off"
                placeholder="Enter your Email Id"
              />
            </div>

            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder="*********"
              />
            </div>

            <button
              className={style.submitBtn + ' my-4'}
              onClick={disableAlert}
              id="btn"
              type="submit"
            >
              Login
            </button>
          </form>
          <button
            onClick={() => {
              resetForm();
              disableAlert();
            }}
            id="btn"
            data-testid="reset"
          >
            Reset Form
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
