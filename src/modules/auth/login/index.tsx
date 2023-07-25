import { useEffect, useState } from 'react';
import { validateEmail, validatePassword } from '../../../utils/validator';
import { Login, setIsUserLoggedIn, setUserRole } from '../../../services/auth';
import { UserAuth } from '../../../interface/login';
import { useNavigate } from 'react-router-dom';
import style from '../../../styles/pages/login.module.scss';
import { setMessage } from '../../../utils/message';

const LoginPage = (props: any) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate('/users');
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setMessage({
        type: 'error',
        content: 'Email is not valid',
      });
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError(true);
      setMessage({
        type: 'error',
        content: 'Password is not valid',
      });
      return;
    }
    try {
      setPasswordError(false);
      const users: any = await Login();
      const user: UserAuth = users.find(
        (user: UserAuth) => user.email === email && user.password === password
      );
      if (user) {
        setUserRole(user.role);
        setIsUserLoggedIn(true);
        setMessage({
          type: 'success',
          content: 'Login Successful',
        });
        navigate('/users');
      } else {
        setMessage({
          type: 'error',
          content: 'Invalid value entered. Please try again.',
        });
        setMessage({
          type: 'error',
          content: 'Invalid User Name or Password',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        content: 'Error fetching data, please try again',
      });
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <>
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
              <span
                className={`${style.passwordError} ${
                  passwordError && style.showPassowrd
                }`}
              >
                Password should contains 8 character, 1 uppercase letter, 1
                lowercase letter, and 1 special character
              </span>
            </div>

            <button
              className={style.submitBtn + ' my-4'}
              id="btn"
              type="submit"
            >
              Login
            </button>
          </form>
          <button
            onClick={() => {
              resetForm();
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
